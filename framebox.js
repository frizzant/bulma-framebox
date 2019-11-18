framebox = () => {
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
            footerItemClass: '',
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
            }
            ;
            iteration++;

        }
        currentItemIndex = iteration;

        // make the content visible/hidden
        theFrameboxContainer.querySelector('.framebox-visible').classList.remove('framebox-visible');
        framebox.items[iteration].classList.add('framebox-visible');

        console.log("itemPosition: " + itemPosition + " currentItemIndex: " + currentItemIndex + ' iteration: ' + iteration);
    };

    let frameboxLoader = () => { // generate HTML footer

        if (framebox.items.length > 0 && framebox.settings.autoGenerate === true) { // Generate footer if autoGenerate is set to true

            framebox.container.insertAdjacentHTML('beforeend', '<footer class="framebox-clicker-container card-footer"></footer>');
            let frameboxItemIteration = 0;
            let activeClass;

            let generateHTML = () => {
                return new Promise((resolve) => { // setting up a PROMISE

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

                        if (frameboxItemIteration === framebox.items.length) { // if last loop
                            resolve('resolved');
                        }
                    }
                });
            };
            generateHTML().then( // making sure the HTML is generated before the framebox rotation starts
                () => {
                    rotateFramebox();
                }
            );
        }

        let rotateFramebox = () => {

            if (framebox.settings.rotate === true) {
                console.log('rotating');

                // let frameboxFooter = framebox.container.querySelector('footer');
                theFrameboxContainer.addEventListener('mouseleave', () => {
                    // console.log('mouseleave');
                    start();
                });

                theFrameboxContainer.addEventListener('mouseenter', () => {
                    // console.log('mouseenter');
                    stop();
                });
                document.addEventListener('touch', function(event) { // listen for touches on document
                    // console.log('mouseenter');
                    let rect = theFrameboxContainer.getBoundingClientRect();
                    let xCoordinate = event.touches[0].clientX - rect.left;
                    let yCoordinate = event.touches[0].clientY - rect.top;

                    if ((xCoordinate >= 0 && xCoordinate <= rect.width) && (yCoordinate >= 0 && yCoordinate <= rect.height)) { // if the coordinates are within the framebox element
                        console.log('stop');
                        stop();
                    } else { // if outside the element
                        console.log('start');
                        start();
                    }
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
                    rotationInterval = setInterval(function () { // Execture every X seconds for as long as it does not get cleared
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
                    if (rotationInterval !== false) {
                        clearInterval(rotationInterval);
                    }
                };

            }
        };
        // rotateFramebox();
    };
    frameboxLoader();
};
framebox();