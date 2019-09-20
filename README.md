# Spck UI

Spck UI is a _lightweight_ (just 37.1kB gzipped), simple, declarative UI library eliminating the need for using
HTML, CSS for creating SPAs (Single Page Applications).

Spck UI is purely the **View** part of **MVC**, and works using vanilla JavaScript, **jQuery**, and the popular components library **UIkit**.

Spck UI takes the approach of using simple JavaScript objects instead of HTML as it is more flexible, integrates better with code and eliminates the need of using JSX or other templating markup.

Spck UI is based on the existing popular [UIkit](https://github.com/uikit/uikit) library for many UI components as well as CSS styling. Although the code can be modified to support other similar libraries.

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

## Documentation

[API Documentation available here.](https://ui.spck.io)

## Projects using Spck UI

- [Spck.io - Online mobile code editor](https://spck.io)

Let me know about your projects using Spck UI!

## Size Comparison

This library is extremely lightweight for an all batteries-included library (except jQuery).

### Frameworks - [Source](https://gist.github.com/Restuta/cda69e50a853aa64912d)

Name  | Size
------------- | -------------
Ember 2.2.0     | 111K
Ember 1.13.8    | 123K
Angular 2       | 111K
Angular 2 + Rx  |    **143K**
Angular 1.4.5   |    51K  
React 0.14.5 + React DOM |          40K
React 0.14.5 + React DOM + Redux |  42K
React 15.3.0 + React DOM | 43K
React 16.2.0 + React DOM | 31.8K
Vue 2.4.2 | **20.9K**
Inferno 1.2.2 | 20K
Aurelia 1.0.2 | 63K

### + Components

Name  | Size
------------- | -------------
React-Bootstrap 0.32.4 | 42.4K
Antd 3.23.3            | **533K**
Semantic UI 2.4.1      | 71.2K
Semantic UI React 0.88.1 | 84.6K
Bulma 0.7.5    | **25.8K** 
Quasar 0.17.20 | 95.2K
UIkit 3.2.0    | 42.5K

### jQuery 2.2.4 + Spck UI 0.3.2 (66.9kB gzipped)

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 11+ ✔ | 9.0+ ✔ | Latest ✔ |
