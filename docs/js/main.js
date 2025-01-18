import {
    getHTML,
    assert_HTML,
    delay
} from "./util.js";

const container = getHTML(document, 'div.container');
const default_block = getHTML(document, 'div.block');

/**
 * 
 * @param {MouseEvent} e
 */
async function dirtfy (e)
{
    this.classList.toggle('dirt');

    const blocks = {
        above: document.elementFromPoint(e.clientX, e.clientY - this.offsetHeight),
        down: document.elementFromPoint(e.clientX, e.clientY + this.offsetHeight),
        left: document.elementFromPoint(e.clientX - this.offsetWidth, e.clientY),
        right: document.elementFromPoint(e.clientX + this.offsetWidth, e.clientY)
    };

    Object.entries(blocks).forEach(async ([key, value]) => {
        const block = assert_HTML(value);
        block.classList.add('hover');
        await delay(20);
        block.classList.remove('hover');
    });

    console.log(blocks)
    
}

default_block.addEventListener('click', dirtfy);

/**
 * @type {{columns: number, rows: number, n: number}}
 */
const grid = {
    columns: 0,
    rows: 0,
    n: 0
};

async function create_blocks (container, block)
{
    const columns = Math.max(grid.columns ?? 0, Math.ceil(window.innerWidth / block.offsetWidth));
    if (columns > grid.columns)
    {
        grid.columns = columns;
        container.style.setProperty('--columns', grid.columns.toString());
    }
    
    const rows = Math.max(grid.rows ?? 0, Math.ceil(window.innerHeight / block.offsetHeight));
    if (rows > grid.rows)
    {
        grid.rows = rows;
        container.style.setProperty('--rows', grid.rows.toString());
    }

    const n = Math.max(grid.n ?? 0, Math.ceil(columns * rows));
    if (n > grid.n)
    {
        for (let i = grid.n; i < n; i++){
            const clone = block.cloneNode();
            clone.addEventListener('click', dirtfy);
            container.appendChild(clone);
        }
        grid.n = n;
    }
};

window.addEventListener('resize', () => create_blocks(container, default_block));

create_blocks(container, default_block);