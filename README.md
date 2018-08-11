# Spck UI

Spck UI is a lightweight, complete, declarative UI library eliminating the need for using
HTML, CSS for creating SPAs (Single Page Applications).

Spck UI is purely the **View** part of **MVC**, and works using vanilla JavaScript, **jQuery**, and the popular components library **UIkit**.

Spck UI takes the approach of using simple JavaScript objects instead of HTML as it is more flexible, integrates better with code and eliminates the need of using JSX or other templating markup.

Spck UI is against redefining the way JavaScript interacts with the template by using additional transpilers or compilers. This all aims for the simplification of debugging, testing, and deploying.

To simplify the learning curve, Spck UI tries to resemble traditional HTML tags and CSS as much as possible, while also using modern things like `flexbox` to simplify layouts.

## Getting Started

Spck UI can be installed using bower:

```bash
bower install spck-ui
```

To add styling, add this tag to your HTML file:

```html
<link rel="stylesheet" href="spck-ui.css">
```

To use include the icon files, also add:
```html
<link rel="stylesheet" href="spck-ui-icons.css">
```

*Credit for the icons goes to the UIkit 3 library.*

Add the following script files:

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="spck-ui.js" type="text/javascript"></script>
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 11+ ✔ | 9.0+ ✔ | Latest ✔ |
