/**
 * @type {HTMLElement}
 */
const body = document.body;

const block = document.querySelector('.block');

if (!block || !(block instanceof HTMLElement))
    throw new Error('main.js: Block not found.');

const blocks = {
    columns: Math.ceil(window.innerWidth / block.offsetWidth),
    rows: Math.ceil(window.innerHeight / block.offsetHeight),
}

const blocks_n = Math.ceil(blocks.columns * blocks.rows);

function create_blocks (block) {
    body.innerHTML = '';

    body.style.setProperty('--columns', blocks.columns.toString());
    body.style.setProperty('--rows', blocks.rows.toString());
    
    for (let i = 0; i < blocks_n; i++)
      body.appendChild(block.cloneNode())
}

window.addEventListener('resize', () => create_blocks(block));

create_blocks(block);