(function( $ ) {
 
    $.fn.discuteaChat = function( options ) {
        
        var settings = $.extend({
            locale:  "en",
            title:   false,
            channel: "Accueil",
            url: "",
            post: false,
            cookies: false,
            debug: false,
            formclass: "discutea",
            template: "semantic",
            btnclass: 'button-chat',
            btnicon: ''
        }, options );

        var trans = {
            username: function() {
                switch(settings.locale) {
                  case "fr":
                    return "Pseudo";
                    break;
                  case "es":
                    return "Seudónimo";
                    break;
                  default:
                    return "Nickname";
                }
            },
            
            years: function() {
                switch(settings.locale) {
                  case "fr":
                    return "ans";
                    break;
                  case "es":
                    return "años";
                    break;
                  default:
                    return "years";
                }
            },
            
            age: function() {
                switch(settings.locale) {
                  case "fr":
                    return "Votre age";
                    break;
                  case "es":
                    return "Tu edad";
                    break;
                  default:
                    return "Your age";
                }
            },
            
            signin: function() {
                switch(settings.locale) {
                  case "fr":
                    return "Connexion";
                    break;
                  case "es":
                    return "Conexión";
                    break;
                  default:
                    return "Sign in";
                }
            },
             
            formtitle: function() {
                if (typeof settings.title === 'object') {
                    title = settings.title[ settings.locale ];
                    
 
                    if (typeof title !== 'undefined') {
                        return title;
                    }
                    
                } 
                    
                if (settings.title === "" || typeof settings.title === 'object') {
                    switch(settings.locale) {
                      case "fr":
                        return "Tchat accès visiteurs.";
                        break;
                      case "es":
                        return "Chat visitantes acceden.";
                        break;
                      default:
                        return "Chat access visitors.";
                    }
                } else { return settings.title; }
            },
            
            channel: function() {
                if (typeof settings.channel === 'object') {
                    channel = settings.channel[ settings.locale ];
                    
 
                    if (typeof channel !== 'undefined') {
                        return channel.replace(/\s/g, '-');
                    }
                    
                } 
                
                if (typeof settings.channel === 'object') {
                    return 'Accueil';
                }
                
                return settings.channel.replace(/\s/g, '-');
            },
            
            appletUrl: function() {
                if (settings.url !== "") {
                    return settings.url;
                }
                
                switch(settings.locale) {
                  case "fr":
                    return "https://appli.greatchat.fr/";
                    break;
                  case "es":
                    return "https://appli.greatchat.es/";
                    break;
                  default:
                    return "https://appli.greatchat.net/";
                }
            }
        };
  
        var html = {
            username: function() {
                if ( (settings.cookies) && (Cookies.get('Username')) ) {
                    user = 
                    field = 'value="'+Cookies.get('Username'); 
                } else {
                    field = 'placeholder="'+trans.username();
                }
                
                field += '"';
               
               if (settings.template === 'bootstrap') {
                    output = '<div class="form-group"> \
                                <div class="input-group"> \
                                  <span class="input-group-addon"><i class="fa fa-user"></i></span> \
                                  <input type="text" id="username" class="form-control" name="username" required="required" maxlength="20" '+field+' /> \
                                </div> \
                              </div>';
               } else {
                    output = '<div class="field"> \
                                <input type="text" id="username" name="username" required="required" maxlength="20" '+field+' /> \
                              </div>';
               }
         
                return output;
            },

            year: function() {
                output = '<select id="age" name="age" required="required" class="form-control"> \
                              <option value="">' + trans.age() + '</option>';

                for (i = 13; i < 90; i++) {
                    output += '<option value="' + i + '"';
                    
                    if ( (settings.cookies) && (Cookies.get('Year')) && (i === Cookies.get('Year')) ) {
                        output += ' selected '; 
                    }
                    
                    output += '>' + i + ' ' + trans.years() + '</option>';
                }
                
                output += '</select>';
                
                return output;
            },

            gender: function() {
                output = '<div id="gender"> \
                             <input type="radio" id="gender_0" name="[gender]" required="required" value="F"';

                if ( (settings.cookies) && (Cookies.get('Sex')) && (Cookies.get('Sex') == 'F') ) {
                  output += ' checked '; 
                }

                output += '/> \
                            <label for="gender_0" class="required"> \
                              <img alt="Woman" src="https://cdn.discutea.com/img/femme.png"/> \
                            </label> \
                            <input type="radio" id="gender_1" name="[gender]" required="required" value="M"';

                if ( (settings.cookies) && (Cookies.get('Sex')) && (Cookies.get('Sex') == 'M') ) {
                  output += ' checked '; 
                }
                
                output += '/> \
                            <label for="gender_1" class="required"> \
                              <img alt="Man" src="https://cdn.discutea.com/img/homme.png"/> \
                            </label> \
                          </div>';
                return output;
            },

            assembler: function() {
                output = '<div id="discuteaTchat">';
                
                if (settings.title !== false) {
                    output += '<h3>' + trans.formtitle() + '</h3>';
                }
                
                output +='<form name="discutea_tchat" method="post" action="#" id="formChat" class="'+settings.formclass+'">';
                output += this.username();

                if (settings.template === 'bootstrap') {
                    output += '<div class="form-group row"><div class="col-xs-6">';
                    output += this.year();
                    output += '</div> <div id="form-sexe" class="col-xs-6">';
                    output += this.gender();
                    output += '</div></div><div class="form-group">';
                } else {
                    output += '<div class="field">';
                    output += this.year();
                    output += '</div><div class="field">';
                    output += this.gender();
                    output += '</div><div class="submit">';
                }

                output += '<button type="submit" form="formChat" class="' + settings.btnclass + '">';
                output += settings.btnicon + " " + trans.signin();
                output += "</button></div></form></div>";
                return output;
            }
        };
        
        var events = {            
            onSubmit: function( e ) {
                e.preventDefault();
 
                nick = $("#username").val();
                age = $("#age").val();
                
                if ($("#gender_1").is(":checked") === true) {
                    gender = 'M';
                } else {
                    gender = 'F';
                }
                
                url = trans.appletUrl();

                if (settings.post === false) {
                  url += "?nick=" + nick;
                  url += "&age=" + age;
                  url += "&gender=" + gender;
                  url += "&channel=" + trans.channel();
                
                  window.location.href = url;
                } else {
                    
                  form = $('<form></form>');
                  form.attr("method", "post");
                  form.attr("action", url);

                  form.append('<input type="hidden" name="tchat[username]" value="'+nick+'">');
                  form.append('<input type="hidden" name="tchat[age]" value="'+age+'">');
                  form.append('<input type="hidden" name="tchat[sexe]" value="'+gender+'">');
                  form.append('<input type="hidden" name="tchat[channel]" value="'+trans.channel()+'">');
                  
                  $(form).appendTo('body').submit();
                }
            }
        };
        
        var $_html = html.assembler();
        
        if (settings.debug === true){
            console.log($_html);
        }
        
        this.html( $_html ); 
        
        if (settings.cookies){
          $("#username", this).blur(function(){
              console.log($(this).val());
            Cookies.set('Username', $(this).val(), { expires: 365 });
          }); 

          $("#age", this).change(function(){
            Cookies.set('Year', $(this).val(), { expires: 365 });
          });
        
          $("#gender", this).change(function(){
            Cookies.set('Sex', $("input[type='radio']:checked", this).val(), { expires: 365 });
          });
        }
        
        $( "#formChat" ).submit(function( e ) {
          events.onSubmit( e );
        });
    };
 
}( jQuery ));
