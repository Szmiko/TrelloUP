$(document).ready(function(){
	console.log('DOM ready');

  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
      for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
    return str;
  };

	function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
    	var $column = $('<div>').addClass('column col-md-4');
    	var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
    	var $columnCardList = $('<ul>').addClass('column-card-list col-md-9');
    	var $columnDelete = $('<button>').addClass('btn-delete col-md-1').text('x');
		  var $columnAddCard = $('<button>').addClass('add-card col-md-2').text('Add a card');

		$columnDelete.on('click', function() {
      self.removeColumn();
      alert('Column deleted.');
		});

    $columnAddCard.on('click', function() {
      self.addCard(new Card(prompt("Enter the name of the card")));
		});

		$column.append($columnTitle)
      .append($columnDelete)
      .append($columnAddCard)
      .append($columnCardList);
		return $column;
    };
};

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
	 var self = this;

  this.id = randomString();
  this.description = description;
  this.$element = createCard();

  function createCard() {
    var $card = $('<li>').addClass('card');
    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    var $cardDelete = $('<button>').addClass('btn-delete').text('x');
	
    $cardDelete.on('click', function(){
      self.removeCard();
    });

    $card.append($cardDelete)
		.append($cardDescription);
		return $card;
    };
  };

  Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
     	this.$element.append(column.$element);
      initSortable();
   	},
    $element: $('#board .column-container')
	};

	function initSortable() {
   	$('.column-card-list').sortable({
     	connectWith: '.column-card-list',
     	placeholder: 'card-placeholder'
   		}).disableSelection();
 	};

 	$('.create-column').on('click', function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
    board.addColumn(column);
  });

  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);
});