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
async function dirtfy (e, toggle = true)
{
    if (toggle)
        this.classList.toggle('dirt');
    else
        this.classList.add('dirt');

    const blocks = {
        above: document.elementFromPoint(e.clientX, e.clientY - this.offsetHeight),
        down: document.elementFromPoint(e.clientX, e.clientY + this.offsetHeight),
        left: document.elementFromPoint(e.clientX - this.offsetWidth, e.clientY),
        right: document.elementFromPoint(e.clientX + this.offsetWidth, e.clientY)
    };

    Object.entries(blocks).forEach(async ([key, value]) => {
        const block = assert_HTML(value);
        block.classList.add('movement');
        await delay(20);
        block.classList.remove('movement');
    });

    console.log(blocks)
    
}

let mouse_down = false;

document.addEventListener('mousedown', () => mouse_down = true);
document.addEventListener('mouseup', () => mouse_down = false);

/**
 * 
 * @param {MouseEvent} e 
 */
async function mouse_move (e)
{
    if (mouse_down)
        dirtfy.call(this, e, false);
}

default_block.addEventListener('click', dirtfy);
default_block.addEventListener('mousemove', mouse_move);

/**
 * @type {{columns: number, rows: number, n: number}}
 */
const grid = {
    columns: 0,
    rows: 0,
    n: 0
};

/**
 * Create blocks to fill the screen.
 * @param {HTMLElement} container 
 * @param {HTMLElement} block 
 */
async function create_blocks (container, block, multiplier = 1)
{
    const columns = multiplier * Math.max(
        grid.columns,
        Math.ceil(window.innerWidth / block.offsetWidth)
    );

    if (columns > grid.columns)
    {
        grid.columns = columns;
        container.style.setProperty('--columns', grid.columns.toString());
    }
    
    const rows = Math.max(
        grid.rows,
        Math.ceil(window.innerHeight / block.offsetHeight)
    );

    if (rows > grid.rows)
    {
        grid.rows = rows;
        container.style.setProperty('--rows', grid.rows.toString());
    }

    const n = Math.max(
        grid.n, 
        Math.ceil(columns * rows)
    );
    if (n > grid.n)
    {
        for (let i = grid.n; i < n; i++)
        {
            const clone = assert_HTML(block.cloneNode());
            clone.addEventListener('click', dirtfy);
            clone.addEventListener('mousemove', mouse_move);
            container.append(clone);
        }
        grid.n = n;
    }
};

window.addEventListener('resize', () => create_blocks(container, default_block));

create_blocks(container, default_block, 2);