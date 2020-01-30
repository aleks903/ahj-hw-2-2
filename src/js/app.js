/* eslint-disable class-methods-use-this */
class LoadingSorting {
  loadList() {
    const dataJSON = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.30,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.20,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.00,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.00,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.90,
        year: 1994,
      },
    ];
    const doc = document.getElementById('tbody');
    for (const item of dataJSON) {
      const itemTr = document.createElement('tr');
      itemTr.dataset.id = item.id;
      itemTr.dataset.title = item.title;
      itemTr.dataset.year = item.year;
      itemTr.dataset.imdb = item.imdb;
      itemTr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>
      `;
      doc.appendChild(itemTr);
    }
  }

  sortPic(columnSort, sortUpDown) {
    const oldRow = document.querySelector('span');
    if (oldRow) {
      const parentOldRow = oldRow.parentNode;
      parentOldRow.removeChild(oldRow);
    }

    let sortArrow;
    sortArrow = '\u{2193}';
    if (sortUpDown === 'up') {
      sortArrow = '\u{2191}';
    }

    const titleHead = document.getElementById(`head-${columnSort}`);
    const addArrow = document.createElement('span');
    addArrow.innerText = sortArrow;
    titleHead.appendChild(addArrow);
  }

  sortStringDown(columnSort) {
    this.sortPic(columnSort, 'down');
    this.sortList('string', columnSort, 'down');
  }

  sortStringUp(columnSort) {
    this.sortPic(columnSort, 'up');
    this.sortList('string', columnSort, 'up');
  }

  sortNumbDown(columnSort) {
    this.sortPic(columnSort, 'down');
    this.sortList('numb', columnSort, 'down');
  }

  sortNumbUp(columnSort) {
    this.sortPic(columnSort, 'up');
    this.sortList('numb', columnSort, 'up');
  }

  sortList(columnType, columnSort, sortUpDown) {
    const listTr = document.querySelectorAll('tbody tr');
    const arrTr = [...listTr];

    if (columnType === 'string') {
      this.sortStr(arrTr, columnSort, sortUpDown);
    } else if (columnType === 'numb') {
      this.sortNum(arrTr, columnSort, sortUpDown);
    }

    const parentTr = listTr[0].parentNode;
    arrTr.forEach((node) => {
      parentTr.appendChild(node);
    });
  }

  sortStr(arrTr, columnSort, sortUpDown) {
    arrTr.sort((a, b) => {
      if (a.dataset[columnSort] > b.dataset[columnSort]) {
        return sortUpDown === 'down' ? -1 : 1;
      }
      if (a.dataset[columnSort] < b.dataset[columnSort]) {
        return sortUpDown === 'down' ? 1 : -1;
      }
      return 0;
    });
  }

  sortNum(arrTr, columnSort, sortUpDown) {
    arrTr.sort((a, b) => {
      if (sortUpDown === 'down') {
        return b.dataset[columnSort] - a.dataset[columnSort];
      }
      return a.dataset[columnSort] - b.dataset[columnSort];
    });
  }

  randomImg() {
    let item = 1;
    setInterval(() => {
      switch (item) {
        case 1:
          this.sortNumbUp('id');
          break;
        case 2:
          this.sortNumbDown('id');
          break;
        case 3:
          this.sortStringUp('title');
          break;
        case 4:
          this.sortStringDown('title');
          break;
        case 5:
          this.sortNumbUp('year');
          break;
        case 6:
          this.sortNumbDown('year');
          break;
        case 7:
          this.sortNumbUp('imdb');
          break;
        default:
          this.sortNumbDown('imdb');
          item = 0;
          break;
      }
      item += 1;
    }, 2000);
  }
}

const gamesBoard = new LoadingSorting();
gamesBoard.loadList();
gamesBoard.randomImg();
