const eventArray = [];

function handleEventListeners(e) {
    eventArray.forEach((target) => {
        if (
            e.target &&
            e.target instanceof Element &&
            e.target.id === target.id
        ) {
            e.preventDefault();
            target.callback && e && target.callback(e);
        }
    });
}

export function addOnClick(
    id,
    callback
) {
    if (id && callback) {
        eventArray.push({ id, callback });
    }
}

window.addEventListener('click', handleEventListeners);