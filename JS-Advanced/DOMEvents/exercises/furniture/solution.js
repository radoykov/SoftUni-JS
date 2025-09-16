function solve() {
  const [btnGenerate, btnBuy] = document.querySelectorAll('button');
  const [textFieldOne, textFiledTwo] = document.querySelectorAll('textarea');
  const tbody = document.querySelector('tbody');

  btnGenerate.addEventListener('click', Generate);
  btnBuy.addEventListener('click', Buy);


  function Generate() {
    const arrOfObjects = JSON.parse(textFieldOne.value);


    for (let object of arrOfObjects) {
      const tr = document.createElement('tr');
      for (let i = 0; i < 5; i++) {
        const td = document.createElement('td');

        if (i == 0) {

          const img = document.createElement('img');
          img.setAttribute('src', object['img']);
          td.appendChild(img);
          tr.appendChild(td);

        } else if (i == 1) {
          const p = document.createElement('p');
          p.textContent = object['name'];
          td.appendChild(p);
          tr.appendChild(td);


        } else if (i == 2) {
          const p = document.createElement('p');
          p.textContent = object['price'];
          td.appendChild(p);
          tr.appendChild(td);


        } else if (i == 3) {
          const p = document.createElement('p');
          p.textContent = object['decFactor'];
          td.appendChild(p);
          tr.appendChild(td);

        } else if (i == 4) {
          const input = document.createElement('input');
          input.setAttribute('type', 'checkbox');
          td.appendChild(input);
          tr.appendChild(td);

        }
        tbody.appendChild(tr);
      }
    }

  }

  function Buy() {
    const arrIsChecked = document.querySelectorAll('input[type=checkbox]:checked');

    const arr = [];
    let sum = 0;
    let avg = 0;


    for (let el of arrIsChecked) {
      const tr = el.parentNode.parentNode;
      arr.push(tr.children[1].children[0].textContent);
      sum += Number(tr.children[2].textContent);
      avg += Number(tr.children[3].textContent);

    }
    textFiledTwo.value = `Bought furniture: ${arr.join(', ')}\n`;
    textFiledTwo.value += `Total price: ${sum.toFixed(2)}\n`;
    textFiledTwo.value += `Average decoration factor: ${avg/arrIsChecked.length}`;
  }
}