/**
 * ichoose.js
 * The the models, controls, and custom controllers that power ichooseyou.hailpixel.com/
 * @Author Devin Hunt
 * @Author-URI http://hailpixel.com
 */
 
if(! "console" in window) {
    window.console = { log : function() {} };
}

 
$(function() {
    
    // ____________________________________________________ Namespace & Constants
    var IChoose = window.IChoose = {
        
        parts: {
            body : [
                { id: 'body1', icon: "media/img/parts/body-1-pink.png", img: "media/img/parts/body-1-pink.png" },
            ],
            faces : [
                { id: 'face1', icon: "media/img/parts/face-1.png", img: "media/img/parts/face-1.png" },
                { id: 'face2', icon: "media/img/parts/face-2.png", img: "media/img/parts/face-2.png" },
                { id: 'face3', icon: "media/img/parts/face-3.png", img: "media/img/parts/face-3.png" },
                { id: 'face4', icon: "media/img/parts/face-4.png", img: "media/img/parts/face-4.png" },
                { id: 'face5', icon: "media/img/parts/face-5.png", img: "media/img/parts/face-5.png" },
                { id: 'face6', icon: "media/img/parts/face-6.png", img: "media/img/parts/face-6.png" },
                { id: 'face7', icon: "media/img/parts/face-7.png", img: "media/img/parts/face-7.png" }
            ],
            eyes : [
                { id: 'eye1', icon: "media/img/parts/eyes-1.png", img: "media/img/parts/eyes-1.png" },
                { id: 'eye2', icon: "media/img/parts/eyes-2.png", img: "media/img/parts/eyes-2.png" },
                { id: 'eye3', icon: "media/img/parts/eyes-3.png", img: "media/img/parts/eyes-3.png" },
                { id: 'eye4', icon: "media/img/parts/eyes-4.png", img: "media/img/parts/eyes-4.png" }
            ],
            arms : [
                { id: 'arm1', icon: "media/img/parts/arms-1-pink.png", img: "media/img/parts/arms-1-pink.png" },
                { id: 'arm2', icon: "media/img/parts/arms-2-pink.png", img: "media/img/parts/arms-2-pink.png" },
                { id: 'arm3', icon: "media/img/parts/arms-3-pink.png", img: "media/img/parts/arms-3-pink.png" },
                { id: 'arm4', icon: "media/img/parts/arms-4-pink.png", img: "media/img/parts/arms-4-pink.png" },
                { id: 'arm5', icon: "media/img/parts/arms-5-pink.png", img: "media/img/parts/arms-5-pink.png" }
            ],
            feet : [
                { id: 'feet1', icon: "media/img/parts/feet-1-pink.png", img: "media/img/parts/feet-1-pink.png" },
                { id: 'feet2', icon: "media/img/parts/feet-2-pink.png", img: "media/img/parts/feet-2-pink.png" },
                { id: 'feet3', icon: "media/img/parts/feet-3-pink.png", img: "media/img/parts/feet-3-pink.png" },
                { id: 'feet4', icon: "media/img/parts/feet-4-pink.png", img: "media/img/parts/feet-4-pink.png" }
            ],
            tails : [
                { id: 'tail1', icon: "media/img/parts/tail-1-pink.png", img: "media/img/parts/tail-1-pink.png" },
                { id: 'tail2', icon: "media/img/parts/tail-2-pink.png", img: "media/img/parts/tail-2-pink.png" },
                { id: 'tail3', icon: "media/img/parts/tail-3-pink.png", img: "media/img/parts/tail-3-pink.png" },
                { id: 'tail4', icon: "media/img/parts/tail-4-pink.png", img: "media/img/parts/tail-4-pink.png" }
            ],
            headgear : [
                { id: 'hg1', icon: "media/img/parts/headgear-1.png", img: "media/img/parts/headgear-1.png" },
                { id: 'hg2', icon: "media/img/parts/headgear-2.png", img: "media/img/parts/headgear-2.png" },
                { id: 'hg3', icon: "media/img/parts/headgear-3.png", img: "media/img/parts/headgear-3.png" },
                { id: 'hg4', icon: "media/img/parts/headgear-4.png", img: "media/img/parts/headgear-4.png" },
                { id: 'hg5', icon: "media/img/parts/headgear-5.png", img: "media/img/parts/headgear-5.png" },
                { id: 'hg6', icon: "media/img/parts/headgear-6.png", img: "media/img/parts/headgear-6.png" },
            ],
        }
    };
    
    // ____________________________________________________ Models
    window.Card = Backbone.Model.extend({
        
    });
    
    // ____________________________________________________ Views
    window.CardView = Backbone.View.extend({
        tagName: 'div',
        className: 'card',
        template : _.template($('#template_card').html()),
        
        initialize : function() {
            this.model.bind('change', this.updateContent);
            this.model.view = this;
        }, 
        
        render : function() {
            var view = this.view || this;
            $(view.el).html(this.template({layers: view.model.toJSON()}));
            view.updateContent();
            return view;
        },
        
        /**
         * Sets all the current image properties based on the model instructions
         */
        updateContent : function() {
            var that = this.view || this;
            
            _.each(that.model.toJSON(), function(val, key) {
                if(IChoose.parts[key]) {
                    var partSet = getLayerUrl(key, val);
                    that.$('.character .' + key + ' img').attr('src', partSet.icon);
                }
            });
            
            that.$('.name').text(that.model.get('name'));
            that.$('.description').text(that.model.get('description'));
        }
    });
    
    window.LandingView = Backbone.View.extend({
        el: $('#landing'),
        
        events : {
            'click .get-started button'     : 'onStartClick'
        },
        
        onStartClick : function(event) {
            window.location.hash = "editor";
        }
    });
    
    window.EditorView = Backbone.View.extend({
        el: $('#editor'),
        
        template: _.template($('#template_editor_ui').html()),
        
        events : {
            "click .toolbox nav a"                  : "onToolboxTabClick",
            "click .tray a.part"                    : "onPartClick",
            "keyup .toolbox .name input"            : "onNameChange",
            "keyup .toolbox .description textarea"  : "onDescriptionChange",
            
            "click .publish"                : "onPublishClick"
        },
        
        currentTray : 'faces',
        
        initialize : function() {
            this.render();
            this.descriptionInput = this.$('.cardtext textmate.description');
        },
        
        render : function() {
            $(this.el).html(this.template(window.IChoose));
            
            if(this.model) {
                this.editCardView = new CardView({model: this.model});
                this.$('.composition').html(this.editCardView.render().el);
            }
            
            if(this.currentTray) {
                this.$('.toolbox nav a.' + this.currentTray).click();
            }
        }, 
        
        /** _____________________________________ Toolbox UI Events */
        onToolboxTabClick : function(event) {
            var partType = $(event.target).attr('data-type');
            
            // set visual state
            this.currentTray = partType;
            this.$('.toolbox nav a').removeClass('selected');
            this.$(event.target).addClass('selected');
            this.$('.toolbox .tray .items').addClass('hidden');
            this.$('.toolbox .tray .' + partType).removeClass('hidden');
        },
        
        onPartClick : function(event) {
            var partEl = $(event.target).parents('a.part');
            var partType = partEl.attr('data-part-type');
            var partId = partEl.attr('data-part-id');
            var newVal = {};
            newVal[partType] = partId;
            this.model.set(newVal);
            return false;
        },
        
        onNameChange : function(event) {
            this.model.set({name: $(event.target).val()});
        },
        
        onDescriptionChange : function(event) {
            this.model.set({description: $(event.target).val()});
        },
        
        onPublishClick : function(event) {
            App.displayCard(hashCard(this.model));
        }
    });
    
    window.StageView = Backbone.View.extend({
        el: $('#stage'), 
        
        events : {
            'click .share-link' : 'onShareLinkClick'
        },
        
        initialize : function() {
            this.render();
        },
        
        render : function() {
            if(this.model) {
                this.cardView = new CardView({model: this.model});
                this.$('.card-container').html(this.cardView.render().el);
            }
        },
        
        setSharing : function() {
            var that = this;
            var bitly_api_key = 'R_93f32037c33c8c020825ea7667be9207';
            var bitly_login = 'hailpixel';
            var url = window.location.href;
            var bitly = new $.Bitly();
            bitly.shorten(url, {
                login: bitly_login, 
                key: bitly_api_key, 
                onSuccess: function(short_url){ 
                    that.$('.share-link').val(short_url);
                    that.$('.tweet-share').html(that._getTwitterWidget(short_url, that.model.get('name')));
                } 
            });
        },
        
        _getTwitterWidget : function(url, name) {
            var message = "This Valentine's Day, I choose you " + name + "!";
            return '<a href="http://twitter.com/share" class="twitter-share-button" data-url="' + url + '" data-text="' + message + '" data-count="vertical">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>'
        },
        
        onShareLinkClick : function(event) {
            $(event.target).focus().select();
        }
    });
    
    window.ChooseYouView = Backbone.View.extend({
        el: $('#ichooseyou'),
        
        currentState: 'landing',
        
        initialize : function() {
            
            // init landing
            
            // init editor
            EditorView.model = generateRandomCard();
            EditorView.render();
            
            // init stage
        }, 
        
        showState : function(view_id) {
            // TEMP TODO :: Transition between states using animated sliding.
            $('.page').addClass('hidden');
            var targetEl = $('#' + view_id);

            function getCenterPosition(el) {
                var elWidth = el.width();
                var winWidth = $(window).width();
                return {top: '220px', left: Math.ceil(winWidth / 2 - elWidth / 2) + 'px' };
            }

            targetEl.removeClass('hidden').css(getCenterPosition(targetEl));
            this.currentState = view_id;
        },
        
        displayCard : function(hash) {
            window.location.hash = 'card/' + hash;
        }
        
    });
    
    // ____________________________________________________ Controllers
    window.ChooseYouController = Backbone.Controller.extend({
        routes : {
            ''                      : 'landing',
            'editor'                : 'editor',
            'card'                  : 'landing',
            'card/:creation_slug'   : 'creation'
        },
        
        landing : function() {
            App.showState('landing');
        },
        
        editor : function() {
            App.showState('editor');
        },
        
        creation : function(creation_slug) {
            StageView.model = dehashCard(creation_slug);
            StageView.render();
            StageView.setSharing();
            App.showState('stage');
        }
    });
    
    // ____________________________________________________ General Utilities
    function generateRandomCard() {
        var model = new Card();
        _.each(IChoose.parts, function(val, key) {
            var index = Math.floor(Math.random() * val.length);
            var prop = {}
            prop[key] = val[index].id
            model.set(prop);
        });
        return model;
    }
    
    function getLayerUrl(type, id) {
        var set = IChoose.parts[type];
        for(var i = 0; i < set.length; i ++) {
            if(set[i].id == id) {
                return set[i];
            }
        }
        return null;
    }
    
    function hashCard(model) {
        // var hash = ''
        // 
        // _.each(model.toJSON(), function(val, key) {
        //     if(val && val != "") {
        //         hash += key + '|' + val + '||';
        //     }
        // });
        return escape(JSON.stringify(model.toJSON()));
    }
    
    function dehashCard(hash) {
        // var pairs = unescape(hash).split('||');
        // var attrs = {};
        // _.each(pairs, function(val) {
        //     var keyval = val.split('|');
        //     attrs[keyval[0]] = keyval[1];
        // });
        return new Card(JSON.parse(unescape(hash)));
    }
    
    // Initialize the app and kick things off ..
    
    window.LandingView = new window.LandingView();
    window.EditorView = new window.EditorView();
    window.StageView = new window.StageView();
    window.App = new window.ChooseYouView();
    new window.ChooseYouController;
    Backbone.history.start();
});