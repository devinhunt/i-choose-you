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
            arms : [
                { name: "Arm 1", id: 'arm1', icon: "/static/img/parts/arm_1_icon.png", img: "" },
                { name: "Arm 2", id: 'arm2', icon: "/static/img/parts/arm_2_icon.png", img: "" },
                { name: "Arm 3", id: 'arm3', icon: "/static/img/parts/arm_3_icon.png", img: "" },
                { name: "Arm 4", id: 'arm4', icon: "/static/img/parts/arm_4_icon.png", img: "" }
            ],
            legs : [
                { name: "Leg 1", id: 'leg1', icon: "/static/img/parts/arm_1_icon.png", img: "" },
                { name: "Leg 2", id: 'leg2', icon: "/static/img/parts/arm_2_icon.png", img: "" },
                { name: "Leg 3", id: 'leg3', icon: "/static/img/parts/arm_3_icon.png", img: "" },
                { name: "Leg 4", id: 'leg4', icon: "/static/img/parts/arm_4_icon.png", img: "" }
            ],
            eyes : [
                { name: "Eye 1", id: 'eye1', icon: "/static/img/parts/arm_1_icon.png", img: "" },
                { name: "Eye 2", id: 'eye2', icon: "/static/img/parts/arm_2_icon.png", img: "" },
                { name: "Eye 3", id: 'eye3', icon: "/static/img/parts/arm_3_icon.png", img: "" },
                { name: "Eye 4", id: 'eye4', icon: "/static/img/parts/arm_4_icon.png", img: "" }
            ]
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
                    that.$('.tinemon .' + key + ' img').attr('src', partSet.icon);
                }
            });
            
            that.$('.name').text(that.model.get('name'));
            that.$('.description').text(that.model.get('description'));
        }
    });
    
    window.LandingView = Backbone.View.extend({
        el: $('#stage')
    });
    
    window.EditorView = Backbone.View.extend({
        el: $('#editor'),
        
        template: _.template($('#template_editor_ui').html()),
        
        events : {
            "click .toolbox nav a"          : "onToolboxTabClick",
            "click .tray a.part"            : "onPartClick",
            "keyup .cardtext .name"         : "onNameChange",
            "keyup .cardtext .description"  : "onDescriptionChange",
            
            "click .publish"                : "onPublishClick",
            "click .randomize"              : "onRandomizeClick"
        },
        
        currentTray : 'arms',
        
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
            this.model.set({name: this.$('.cardtext .name').val()});
        },
        
        onDescriptionChange : function(event) {
            this.model.set({description: this.$('.cardtext .description').val()});
        },
        
        onPublishClick : function(event) {
            App.displayCard(hashCard(this.model));
        },
        
        onRandomizeClick : function(event) {
            
        }
    });
    
    window.StageView = Backbone.View.extend({
        el: $('#stage'), 
        
        initialize : function() {
            this.render();
        },
        
        render : function() {
            if(this.model) {
                this.cardView = new CardView({model: this.model});
                this.$('.card-container').html(this.cardView.render().el);
            }
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
                return {top: '128px', left: Math.ceil(winWidth / 2 - elWidth / 2) + 'px' };
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
        return JSON.stringify(model);
    }
    
    function dehashCard(hash) {
        var modelObj = JSON.parse(hash);
        return new Card(modelObj);
    }
    
    // Initialize the app and kick things off ..
    
    window.LandingView = new window.LandingView();
    window.EditorView = new window.EditorView();
    window.StageView = new window.StageView();
    window.App = new window.ChooseYouView();
    new window.ChooseYouController;
    Backbone.history.start();
});