# React Hooks

Com React Hooks, cada variável dentro do state é um useState separado.
Antes era tudo um `state = { ... }`, mas agora cada item é uma variável separada e já vem com uma função de `set`

```javascript
const [tech, setTech] = useState([]);
const [newTech, setNewTech] = useState('');
```

### UseEffect

Sintaxe:

```javascript
useEffect(() => {}, []);
```

Ele age como um listener que vai agir quando algo acontece
`@param01 => () => { }` > Função que será executada
`@param02 => []`> Quando será executada => Caso seja passado um array vazio, o useEffect executa apenas uma vez

### useMemo

Usado para fazer cálculos de alguma variável apenas em momentos necessários, evita que o cálculo seja executado
toda vez que um componente é atualizado.

Parâmetros da sintaxe são iguais aos do useEffect

```javascript
const techSize = useMemo(() => tech.length, [tech]);
```

### useCallback

Semelhante ao useMemo, mas ao invés de retorna um valor, retorna uma função

```javascript
const handleAdd = useCallback(() => {
  setTech([...tech, newTech]);
  setNewTech('');
}, [newTech, tech]);
```

#### Código de exemplo

```javascript
import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  /**
   * Com React Hooks, cada variável dentro do state é um useState separado.
   * Antes era tudo um state = { ... }, mas agora cada item é uma variável separada
   */

  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // Só faz as funções de set se uma das variáveis que forem passadas forem alteradas
  // é necessário passar como parâmeros todas as variáveis que tiverem valores alterados dentro da função
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // simulando um componentDidMount - executando apenas uma vez
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // toda vez que a variável tech for alterada, salva o valor dela no localstorage
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // Só faz esse cálculo quando houver alteração na variável tech
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input onChange={e => setNewTech(e.target.value)} value={newTech} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
```
