# bulma-framebox

A dynamic fixed box to display news/hints/ads in a Bulma CSS fashion

By default the box is at the bottom-right corner of the website.
It will stop cycling if you hover/touch over the element, or disable it in the settings.

![alt text](/images/image.png)

Here a little sneak-peek:

![alt text](/images/preview.gif)

## Why Do I Need It?

Want to show some special content on your page?

You could display **messages**, **ads**, **news**, or a lot more with ease
and some bulma-swag.

## Dependencies
Since the custom.sass/custom.css is built upon the **Bulma CSS Framework**,
it is recommended to use this as your base. However if you want to write
your own CSS, go ahead.
The Javascript should keep working,
if you keep the necessary ids/classes and HTML structure.

Going Vanilla JS, **no JQuery needed**! Lightweight and totally free of any JS frameworks.

Javascript version: **ES6**.
_(rewriting it for crossbrowser compatibility and IE should be pretty simple.)_

## Setup

The recommended structure is the following:

```html
<div id="framebox-container" class="card">
    <section class="section content column">
        <div class="framebox-item framebox-visible" data-title="Title">
            <h1>Title</h1>
            <p>Text</p>
        </div>
        <div class="framebox-item" data-title="Title Two">
            <h1>Title Two</h1>
            <p>Text</p>
        </div>
        <div class="framebox-item" data-title="Title Three">
            <h1>Title Three</h1>
            <p>Text</p>
        </div>
    </section>
</div>
```

If you added this, the script will automatically generate
the `framebox-clicker-container`/footer.

You can directly modify the html inline-style (`width`).

The `data-title` will be copied to the generated `framebox-clicker` boxes.
It is not a required field, but there is no reason to keep it blank.

Simply load the `framebox.js` file in the footer (after the HTML code) so
it can find the necessary ids and classes it is looking for.

Successful? Yes?
Then the `footer` will be generated, which will look a lot like this:

```html
<footer class="framebox-clicker-container card-footer">
    <a href="#" data-clicker-id="0" class="framebox-clicker card-footer-item">First</a>
    <a href="#" data-clicker-id="1" class="framebox-clicker card-footer-item">Second</a>
    <a href="#" data-clicker-id="2" class="framebox-clicker card-footer-item">Third</a>
</footer>
```
### Settings

Currently you can tweak the JS settings directly within the `framebox.js` file.
These are the default values.
```javascript
let framebox = {
    // more stuff here
    settings: {
        autoGenerate: true,     // true | false 
        rotate: true,           // true | false
        rotateTimeout: 3000,    // number in ms          
    },
};
```

#### autoGenerate
Switches the automatic `<footer>...</footer>` generation on or off.
#### rotate
Switches the automatic rotation of the framebox on or off. (Think of it in terms of a slider)
#### rotateTimeout
Sets the time in between each displayed item in milliseconds.

### Minimal Structure

This is the minimal structure needed to keep the script running how it was supposed to:

```HTML
<div id="framebox-container">
    <div class="framebox-item framebox-visible" data-title="Title"><!--your html--></div>
    <div class="framebox-item" data-title="Title"><!--your html--></div>
    <div class="framebox-item" data-title="Title"><!--your html--></div>
</div>
```

I think we are done here.