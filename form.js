(function( $ ) {
 
    $.fn.discuteaChat = function( options ) {
        
        var settings = $.extend({
            locale:  "en",
            title:   "",
            channel: "Accueil",
            url: ""
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
                output = '<div class="field"> \
                            <input type="text" id="username" name="username" required="required" maxlength="20" placeholder="' + trans.username() + '" /> \
                          </div>';
                          
                return output;
            },

            year: function() {

                output = '<div class="field"> \
                            <select id="age" name="age" required="required"> \
                              <option value="">' + trans.age() + '</option>';
                
                for (i = 13; i < 90; i++) {
                    output += '<option value="' + i + '">' + i + ' ' + trans.years() + '</option>';
                }
                
                output += '</select></div>';
                
                return output;
            },
            
            gender: function() {
                return '<div class="field"> \
                          <div id="gender"> \
                            <input type="radio" id="gender_0" name="[gender]" required="required" value="F" /> \
                            <label for="gender_0" class="required"> \
                              <img alt="Woman" src="https://cdn.discutea.com/img/femme.png"/> \
                            </label> \
                            <input type="radio" id="gender_1" name="[gender]" required="required" value="M" /> \
                            <label for="gender_1" class="required"> \
                              <img alt="Man" src="https://cdn.discutea.com/img/homme.png"/> \
                            </label> \
                          </div> \
                        </div>';
            },
            
            countries: function() {
                
                output = '<div class="field"> \
                            <select id="country" name="country" required="required">';
                
                $.getJSON( "https://discutea.fr/api/irc/form/country", function( data ) {
               
                    if (data.length > 0){

                        countrieslist = '<option value="" selected="selected">' + trans.country() + '</option>';
                        
                        $.each( data, function( key, val ) {
                            countrieslist += '<option value="' + val.id + '">' + val.country + '</option>';
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
                            <form name="tchat" method="post" action="#" id="formTchat">';
                
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
                            $field.append('<option value="' + val.id + '">' + val.region + '</option>');
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
                url += "?nick=" + nick;
                url += "&age=" + age;
                url += "&sex=" + gender;
                url += "&country=" + country;

                if (region != '') {
                    url += "&district=" + region;
                }
                
                url += "&channel=#" + trans.channel();
                
                window.location.href = url;
            }
        }

       
        
        
        this.html( html.assembler() );
        $("#field_region").hide();
        
        $("#country").change(function() {
          country = $("#country").val();
          events.onCountryChange(country);
        });  
        
        $( "#formTchat" ).submit(function( e ) {
          events.onSubmit( e );
        });
    };
 
}( jQuery ));
