// --- Variables + Objects
// ---
let rotationInterval = false;
let currentItemIndex = 0;
let theFrameboxContainer = document.getElementById('framebox-container');
let framebox = {
    container: theFrameboxContainer,
    items: theFrameboxContainer.querySelectorAll('.framebox-item'),
    // clicker: theFrameboxContainer.querySelectorAll('.framebox-item'),
    settings: {
        autoGenerate: true,
        rotate: true,
        rotateTimeout: 3000,
    },
    // visibleFramebox: theFrameboxContainer.querySelector('.framebox-visible'),
};
// ---
// --- END Variables
let theClickEvent = (clickedItem) => {

    let theClickerItem = document.querySelectorAll('footer .framebox-clicker');
    // if (typeof clickedItem === 'object') {
        console.log(clickedItem.innerHTML);
        let itemPosition = clickedItem.dataset.clickerId;
    // } else {
    //     let itemPosition;
    // }

    // get active element from footer, remove class, and add it to the current element
    let theActiveClicker = document.querySelector('#framebox-container footer .active');
    if (theActiveClicker !== null) {
        theActiveClicker.classList.remove('active');
    }
    clickedItem.classList.add('active');

    let iteration = 0;
    for (let item of theClickerItem) {
        if (item.classList.contains('active')) {
            break;
        };
        iteration++;

    }
    currentItemIndex = iteration;

    // make the content visible/hidden
    theFrameboxContainer.querySelector('.framebox-visible').classList.remove('framebox-visible');
    framebox.items[iteration].classList.add('framebox-visible');

    console.log("itemPosition: " + itemPosition + " currentItemIndex: " + currentItemIndex + ' iteration: ' + iteration);
};

let frameboxLoader = () => { // generate HTML footer

    if (framebox.items.length > 0 && framebox.settings.autoGenerate === true ) { // Generate footer if autoGenerate is set to true
        framebox.container.insertAdjacentHTML('beforeend', '<footer class="framebox-clicker-container card-footer"></footer>');

        let frameboxItemIteration = 0;
        let activeClass;
        for (let item of framebox.items) {
            if (frameboxItemIteration === 0) {
                activeClass = 'active';
            } else {
                activeClass = '';
            }
            framebox.container.querySelector('footer').insertAdjacentHTML('beforeend', '<a href="#" data-clicker-id="' + frameboxItemIteration + '" class="framebox-clicker card-footer-item ' + activeClass + '">' + item.dataset.title + '</a>');

            let theClickerItem = (document.querySelectorAll('footer .framebox-clicker'))[frameboxItemIteration];
            theClickerItem.addEventListener('click', function (event) {
                theClickEvent(this); // give element to function
            });

            frameboxItemIteration++;
        }
    }

    let rotateFramebox = () => {

        if (framebox.settings.rotate === true) {
            console.log('rotating');

            let frameboxFooter = framebox.container.querySelector('footer');
            frameboxFooter.addEventListener('mouseleave', () => {
                // console.log('mouseleave');
                start();
            });

            frameboxFooter.addEventListener('mouseenter', () => {
                // console.log('mouseenter');
                stop();
            });

            let start = () => {
                // theClickEvent();
                let clickerItem = framebox.container.querySelectorAll('footer .framebox-clicker');
                // console.log(clickerItem);
                // clicker[2].click();

                // let theActiveClicker = document.querySelector('#framebox-container footer .active');
                // theActiveClicker.classList.remove('');
                // if (typeof counter === "undefined") {
                // let currentItemIndex = 0;
                // }

                if (rotationInterval !== false) {
                    clearInterval(rotationInterval);
                }
                rotationInterval = setInterval( function() { // Execture every X seconds for as long as it does not get cleared
                    // console.log(currentItemIndex);
                    if (currentItemIndex === clickerItem.length) {
                        currentItemIndex = 0;
                    }

                    for (let item of clickerItem) { // remove the .active classes and add it to the current item
                        item.classList.remove('active');
                    }
                    clickerItem.item(currentItemIndex).classList.add('active');

                    for (let item of framebox.items) { // remove the .framebox-visible classes and add it to the current item
                        item.classList.remove('framebox-visible');
                    }
                    framebox.items[currentItemIndex].classList.add('framebox-visible');
                    currentItemIndex++;
                }, framebox.settings.rotateTimeout);

            };
            start();

            let stop = () => {
            };

        }
    };
    rotateFramebox();
};
frameboxLoader();