class RecintosZoo {
  constructor() {
      this.recintos = [
        {numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'macaco', quantidade: 3 }]},
        {numero: 2, bioma: 'floresta', tamanho: 5, animais: []},
        {numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'gazela', quantidade: 1 }]},
        {numero: 4, bioma: 'rio', tamanho: 8, animais: []},
        {numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'leao', quantidade: 1 }]}
      ];

      this.animais = {
        'leao': {tamanho: 3, biomas: ['savana'], carnivoro: true},
        'leopardo': {tamanho: 2, biomas: ['savana'], carnivoro: true},
        'crocodilo': {tamanho: 3, biomas: ['rio'], carnivoro: true},
        'macaco': {tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false},
        'gazela': {tamanho: 2, biomas: ['savana'], carnivoro: false },
        'hipopotamo': {tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false}
      };
  }

  analisaRecintos(especie, quantidade) {
    especie = especie.toLowerCase();

    if (!this.animais[especie]) {
      return {erro: 'Animal inválido', recintosViaveis: null};
    }

    if (quantidade <= 0) {
      return {erro: 'Quantidade inválida', recintosViaveis: null};
    }

    const animal = this.animais[especie];
    let recintosViaveis = [];

    for (const recinto of this.recintos) {
      const biomasCompatíveis = animal.biomas.includes(recinto.bioma) || (recinto.bioma === 'savana e rio' && animal.biomas.includes('savana'));

      if (!biomasCompatíveis) continue;

      let espacoOcupado = recinto.animais.reduce((total, { especie, quantidade }) => {
        let tamAnimal = this.animais[especie].tamanho;
        return total + (tamAnimal * quantidade);
      }, 0);

      const espacoNecessario = animal.tamanho * quantidade;
      let espacoLivre = recinto.tamanho - espacoOcupado;

      const carnívorosPresentes = recinto.animais.some(a => this.animais[a.especie].carnivoro);
      if (carnívorosPresentes && !recinto.animais.some(a => a.especie === especie)) continue;

      if (especie === 'hipopotamo' && recinto.bioma !== 'savana e rio') continue;

      if (especie === 'macaco') {
        if (recinto.animais.length === 0 && quantidade < 2) continue;
        if (carnívorosPresentes) continue;
      }

      let espacoExtra = 0;
      if (recinto.animais.length > 0 && !recinto.animais.every(a => a.especie === especie)) {
        espacoExtra = 1;
      }

      if (espacoLivre >= espacoNecessario + espacoExtra) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario - espacoExtra} total: ${recinto.tamanho})`);
      }
    }

    if (recintosViaveis.length > 0) {
      return {recintosViaveis};
    } else {
      return {erro: 'Não há recinto viável', recintosViaveis: null};
    }
    
  }
}

export { RecintosZoo as RecintosZoo };