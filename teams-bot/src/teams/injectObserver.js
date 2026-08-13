async function injectObserver(page) {

    await page.evaluate(() => {

        if (window.__observerInstalled)
            return;

        window.__observerInstalled = true;

        window.__LAST_MESSAGE__ = null;

        const observer = new MutationObserver(() => {

            const wrappers = document.querySelectorAll(
                '[data-testid="message-wrapper"]'
            );

            if (!wrappers.length)
                return;

            const last = wrappers[wrappers.length - 1];

            window.__LAST_MESSAGE__ = last.innerText;

        });

        observer.observe(document.body, {

            childList: true,
            subtree: true

        });

        console.log("Observer Ready");

    });

}

module.exports = {

    injectObserver

};