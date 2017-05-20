# JQuery pluging form for connexion on discutea chat

Including CSS & JavaScript

```html
  <head>
    <!-- ... -->
    <link href="https://cdn.discutea.com/discuteachat/style.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://cdn.discutea.com/discuteachat/form.js"></script>
    <!-- ... -->
  </head>
```


Add the div or you want your form
    
```html
<div id="form"></div>
```

Call the plug
```javascript
  <script>
    $(document).ready(function() {
      $( "#form" ).discuteaChat({});
    });
  </script>
```


Pluging Option:

    locale: Choice of language used 
    
    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
            locale: "fr"
          });
        });
      </script>
    ```

    title: Title of the form
    
    ex for string
    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
            locale: "fr",
            title:  "My form title"
          });
        });
      </script>
    ```

    ex for object
    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
            locale: "fr",
            title:  {
              en: 'My form title',
              es: 'El título de mi formulario',
              fr: 'Titre de mon formulaire.'
            }
          });
        });
      </script>
    ```
    
    Channel: The channel that the user will automatically join to the connection
    
    ex for string
    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
            locale: "fr",
            title:  "Mon super titre"
            title:  "Accueil"
          });
        });
      </script>
    ```

    ex for object
    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
            locale: "fr",
            title:  {
              en: 'My form title',
              es: 'El título de mi formulario',
              fr: 'Titre de mon formulaire.'
            },
            channel:  {
              en: 'Home',
              es: 'Casa',
              fr: 'Accueil'
            }
          });
        });
      </script>
    ```
    
Url: This setting can be useful for installing chat in your own window

    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
            url: "https://mywebsite.tld/"
          });
        });
      </script>
    ```



All options:

    ```javascript
      <script>
        $(document).ready(function() {
          $( "#form" ).discuteaChat({
              locale:  "en",
              title:   false,
              url: "",
              channel: "Accueil",
              post: false,
              cookies: false,
              debug: false,
              formclass: 'col-lg-offset-3 col-lg-6',
              template: 'bootstrap',
              btnclass: 'btn btn-default btn-lg btn-block',
              btnicon: ' <i class="fa fa-rocket"></i> '
          });
        });
      </script>
    ```

[DEMO](https://cdn.discutea.com/discuteachat)
