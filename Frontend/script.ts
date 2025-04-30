interface Processo {
    nome_cliente: string;
    etapa_1: string;
    etapa_2: string;
    etapa_3: string;
  }
  
  document.getElementById('formProcesso')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome_cliente = (document.getElementById('nome_cliente') as HTMLInputElement).value;
    const etapa_1 = (document.getElementById('etapa_1') as HTMLSelectElement).value;
    const etapa_2 = (document.getElementById('etapa_2') as HTMLSelectElement).value;
    const etapa_3 = (document.getElementById('etapa_3') as HTMLSelectElement).value;
  
    const processo: Processo = {
      nome_cliente,
      etapa_1,
      etapa_2,
      etapa_3,
    };
  
    // Enviar os dados para o backend (salvar-processo.php)
    fetch('backend/salvar-processo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processo),
    })
    .then(response => response.json())
    .then(data => {
      const link = `cliente.html?codigo=${data.codigo}`;
      const linkElemento = document.getElementById('cliente_link') as HTMLAnchorElement;
      linkElemento.href = link;
      document.getElementById('link_cliente')!.style.display = 'block';
    });
  });
  
  // Se o código do processo for passado na URL (cliente.html)
  const urlParams = new URLSearchParams(window.location.search);
  const codigo = urlParams.get('codigo');
  
  if (codigo) {
    // Buscar os dados do processo e atualizar as bolinhas
    fetch(`backend/carregar-processo.php?codigo=${codigo}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          updateProgress(data);
        }
      });
  }
  
  function updateProgress(data: Processo) {
    const etapas = ['etapa_1', 'etapa_2', 'etapa_3'];
    etapas.forEach((etapa, index) => {
      const bolinha = document.getElementById(etapa)!.querySelector('.bolinha') as HTMLSpanElement;
      const status = data[etapa];
      
      if (status === 'nao_iniciado') {
        bolinha.style.backgroundColor = '#ccc'; // Cinza
      } else if (status === 'em_andamento') {
        bolinha.style.backgroundColor = '#FFEB3B'; // Amarelo
      } else if (status === 'concluido') {
        bolinha.style.backgroundColor = '#4CAF50'; // Verde
      }
    });
  }
  