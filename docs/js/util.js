/**
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export async function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Assert a condition. If the condition is false, an error is thrown with the message.
 * @param {boolean} condition 
 * @param {string} message 
 */
export function assert(condition, message)
{
    if (!condition)
        throw message;
}

/**
 * In lieu of writing in TypeScript and having the convenient non-null assertion
 * operator (!), this helper function allows asserting that something is not
 * null or undefined without having to write a JSDoc type cast that has to
 * explicitly know the non-null type (which is error prone).
 *
 * @template {any} T
 * @param {T} item
 */
export function assert_existence(item)
{
    if (item === null || item === undefined)
        throw 'Item is null or undefined.'
    return item
}

/**
 * 
 * @param {Element | null} element 
 * @returns {HTMLElement}
 */
export function assert_HTML(element)
{
    const html = element instanceof HTMLElement ? element : null;
    return assert_existence(html);
}

// Add a new prototype function to window.Document called "query" to make it easier to query the document.
// This function is a wrapper around document.querySelector.

/**
 * Query the document and return the HTMLElement.
 * @param {HTMLElement | Document} document
 * @param {string} selector
 * @returns {HTMLElement}
 */
export function getHTML(document, selector)
{
    const element = assert_existence(document.querySelector(selector));
    const html = element instanceof HTMLElement ? element : null;
    return assert_existence(html);
}