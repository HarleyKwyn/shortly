window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <div class="search"></div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView"
    // "click li a.search": "renderSearchView"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    this.$el.find('#container').html( linksView.render().el );
    var searchView = new Shortly.SearchView( {collection: links });
    $('.search').show();
    this.$el.find('.search').html( searchView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    $(".search").hide();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },
  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});