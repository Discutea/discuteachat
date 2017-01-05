(function( $ ) {
 
    $.fn.discuteaChat = function( options ) {
        
        var settings = $.extend({
            locale:  "en",
            title:   "",
            channel: "Accueil",
            url: "",
            post: false,
            cookies: false
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
            
            country: function() {
                switch(settings.locale) {
                  case "fr":
                    return "Votre pays";
                    break;
                  case "es":
                    return "Tu país";
                    break;
                  default:
                    return "Your country";
                }
            },
            
            state: function() {
                switch(settings.locale) {
                  case "fr":
                    return "Votre région";
                    break;
                  case "es":
                    return "Tu región";
                    break;
                  default:
                    return "Your state";
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
                if (typeof settings.title == 'object') {
                    title = settings.title[ settings.locale ];
                    
 
                    if (typeof title != 'undefined') {
                        return title;
                    }
                    
                } 
                    
                if (settings.title == "" || typeof settings.title == 'object') {
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
                if (typeof settings.channel == 'object') {
                    channel = settings.channel[ settings.locale ];
                    
 
                    if (typeof channel != 'undefined') {
                        return channel.replace(/\s/g, '-');
                    }
                    
                } 
                
                if (typeof settings.channel == 'object') {
                    return 'Accueil';
                }
                
                return settings.channel.replace(/\s/g, '-');
            },
            
            appletUrl: function() {
                if (settings.url != "") {
                    return settings.url;
                }
                
                switch(settings.locale) {
                  case "fr":
                    return "https://kiwi.discutea.fr/";
                    break;
                  case "es":
                    return "https://kiwi.discutea.es/";
                    break;
                  default:
                    return "https://kiwi.discutea.net/";
                }
            }
        }
  
        var html = {
            username: function() {
                if ( (settings.cookies) && (Cookies.get('Username')) ) {
                    user = 
                    field = 'value="'+Cookies.get('Username'); 
                } else {
                    field = 'placeholder="'+trans.username();
                }
                
                field += '"';
                
                output = '<div class="field"> \
                            <input type="text" id="username" name="username" required="required" maxlength="20" '+field+' /> \
                          </div>';
                          
                return output;
            },

            year: function() {

                output = '<div class="field"> \
                            <select id="age" name="age" required="required"> \
                              <option value="">' + trans.age() + '</option>';
                
                for (i = 13; i < 90; i++) {
                    output += '<option value="' + i + '"';
                    
                    if ( (settings.cookies) && (Cookies.get('Year')) && (i == Cookies.get('Year')) ) {
                        output += ' selected '; 
                    }
                    
                    output += '>' + i + ' ' + trans.years() + '</option>';
                }
                
                output += '</select></div>';
                
                return output;
            },

            gender: function() {
                output = '<div class="field"> \
                            <div id="gender"> \
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
                          </div> \
                        </div>';
                return output;
            },
            
            countries: function() {
                
                output = '<div class="field"> \
                            <select id="country" name="country" required="required">';
                
                $.getJSON( "https://discutea.fr/api/irc/form/country", function( data ) {
               
                    if (data.length > 0){

                        countrieslist = '<option value="">' + trans.country() + '</option>';
                        
                        $.each( data, function( key, val ) {
                            countrieslist += '<option value="' + val.id + '"';
                            
                          if ( (settings.cookies) && (Cookies.get('Country')) && (val.id == Cookies.get('Country')) ) {
                            countrieslist += ' selected '; 
                          }

                            countrieslist += '>' + val.country + '</option>';
                        });

                        $("#country").html(countrieslist);
                    }
                });
                
                
                output += '</select></div>';
                return output;
            },
            
            
            assembler: function() {       
                output = '<div id="discuteaTchat"> \
                            <h3>' + trans.formtitle() + '</h3> \
                            <form name="tchat" method="post" action="#" id="formChat">';
                
                output += this.username();
                output += this.year();
                output += this.gender();
                output += this.countries();
                
                output += '<div id="field_region" class="field"> \
                             <select id="region" name="region"> \
                               <option value="">' + trans.state() + '</option> \
                             </select> \
                           </div>';
                
                output += "<div class='submit'> \
                             <input type='submit' class='button-chat' value='" + trans.signin() + "' /> \
                           </div></form></div>";
                
                return output;
            }
            
        }
        
        var events = {
            onCountryChange: function( country_id) {
                $("#field_region").hide();
                $field = $("#region");

                $.getJSON( "https://discutea.fr/api/irc/form/regions/"+country_id, function( data ) {
                    $field.empty();
                    if (data.length > 0){
                        $.each( data, function( key, val ) {
                          if ( (settings.cookies) && (Cookies.get('District')) && (val.id == Cookies.get('District')) ) {
                            $field.append('<option value="' + val.id + '" selected >' + val.region + '</option>');
                          } else {
                            $field.append('<option value="' + val.id + '">' + val.region + '</option>');
                          }                            
                        });
                        $("#field_region").show();
                    }
                });
            },
            
            onSubmit: function( e ) {
                e.preventDefault();
 
                nick = $("#username").val();
                age = $("#age").val();
                
                if ($("#gender_1").is(":checked") === true) {
                    gender = 'M';
                } else {
                    gender = 'F';
                }
                
                country = $("#country").find('option:selected').text();
                region = $("#region").find('option:selected').text();
                
                url = trans.appletUrl();

                if (settings.post === false) {
                  url += "?nick=" + nick;
                  url += "&age=" + age;
                  url += "&sex=" + gender;
                  url += "&country=" + country;

                  if (region != '') {
                    url += "&district=" + region;
                  }
                
                  url += "&channel=#" + trans.channel();
                
                  window.location.href = url;
                } else {
                    
                  form = $('<form></form>');
                  form.attr("method", "post");
                  form.attr("action", url);

                  form.append('<input type="hidden" name="tchat[username]" value="'+nick+'">');
                  form.append('<input type="hidden" name="tchat[age]" value="'+age+'">');
                  form.append('<input type="hidden" name="tchat[sexe]" value="'+gender+'">');
                  form.append('<input type="hidden" name="tchat[pays]" value="'+country+'">');
                  if (region != '') {
                    form.append('<input type="hidden" name="tchat[region]" value="'+region+'">');
                  }
                  form.append('<input type="hidden" name="tchat[channel]" value="'+trans.channel()+'">');
                  
                  $(form).appendTo('body').submit();
                }
            }
        }

        this.html( html.assembler() );
        $("#field_region", this).hide();

        if ( (settings.cookies) && (Cookies.get('Country')) ) {
            events.onCountryChange( Cookies.get('Country') ); 
        }

        $("#country", this).change(function() {
          country = $(this).val();
          events.onCountryChange(country);
           if (settings.cookies) {
               Cookies.set('Country', country, { expires: 365 });  
           }
        });  
        
        if (settings.cookies){
          $("#username", this).blur(function(){
              console.log($(this).val());
            Cookies.set('Username', $(this).val(), { expires: 365 })
          }); 

          $("#age", this).change(function(){
            Cookies.set('Year', $(this).val(), { expires: 365 })
          });
        
          $("#gender", this).change(function(){
            Cookies.set('Sex', $("input[type='radio']:checked", this).val(), { expires: 365 })
          });
          
          $("#region", this).change(function() {
            Cookies.set('District', $(this).val(), { expires: 365 });  
          });
        }
        
        $( "#formChat" ).submit(function( e ) {
          events.onSubmit( e );
        });
    };
 
}( jQuery ));
