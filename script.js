// --- Variables + Objects
// ---
let theFrameboxContainer = document.getElementById('framebox-container');
let framebox = {
    container: theFrameboxContainer,
    items: theFrameboxContainer.querySelectorAll('.framebox-item'),
    // visibleFramebox: theFrameboxContainer.querySelector('.framebox-visible'),
};
// ---
// --- END Variables
let theClickEvent = (clickedItem) => {
    console.log(clickedItem.innerHTML);
    let itemPosition = clickedItem.dataset.clickerId;

    theFrameboxContainer.querySelector('.framebox-visible').classList.remove('framebox-visible');
    framebox.items[itemPosition].classList.add('framebox-visible');
};

let frameboxLoader = () => {
    if (framebox.items.length > 0) {
        framebox.container.insertAdjacentHTML('beforeend', '<footer class="framebox-clicker-container card-footer"></footer>');

        let frameboxItemIteration = 0;
        for (let item of framebox.items) {
            framebox.container.querySelector('footer').insertAdjacentHTML('beforeend', '<a href="#" data-clicker-id="' + frameboxItemIteration + '" class="framebox-clicker card-footer-item">' + item.dataset.title + '</a>');

            let theClickerItem = (document.querySelectorAll('footer .framebox-clicker'))[frameboxItemIteration];
            theClickerItem.addEventListener('click', function (event) {
                theClickEvent(this);
            });

            frameboxItemIteration++;
        }
    }

    let rotateFramebox = () => {
        console.log('rotating');

        let frameboxFooter = framebox.container.querySelector('footer');
        frameboxFooter.addEventListener('mouseleave', () => {
            console.log('mouseleave');
            stop();
        });

        frameboxFooter.addEventListener('mouseenter', () => {
            console.log('mouseenter');
            start();
        });

        let start = () => {};
        let stop = () => {};


        // let start = () => {
        //     console.log('start()');
        //     framebox.container.querySelector('footer').addEventListener('mouseleave', () => {
        //         console.log('mouseleave');
        //         stop();
        //     });
        //
        //     let stop = () => {
        //         console.log('stop()');
        //         framebox.container.querySelector('footer').addEventListener('mouseenter', () => {
        //             console.log('mouseenter');
        //         });
        //     };
        //
        // };

    };
    rotateFramebox();
};
frameboxLoader();