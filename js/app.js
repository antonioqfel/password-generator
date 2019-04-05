(function () {
    
    /* General objects and variables */
    var app = document.getElementById('app');
    var inputCharacters = document.getElementById('number-characters');

    var configuration = {
        characters: parseInt(inputCharacters.value),
        symbols: true,
        numbers: true,
        uppercase: true,
        lowercase: true
    }

    var characters = {
        numbers: '0 1 2 3 4 5 6 7 8 9',
        symbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        uppercase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    /* Events */
    app.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    app.elements.namedItem('btn-plus-one').addEventListener('click', function () {
        configuration.characters++;
        inputCharacters.value = configuration.characters
    });

    app.elements.namedItem('btn-minus-one').addEventListener('click', function () {
        if (configuration.characters > 1) {
            configuration.characters--;
            inputCharacters.value = configuration.characters;
        }  
    });

    app.elements.namedItem('btn-symbols').addEventListener('click', function () {
        btnToggle(this);
        configuration.symbols = !configuration.symbols;
    });

    app.elements.namedItem('btn-numbers').addEventListener('click', function () {
        btnToggle(this);
        configuration.numbers = !configuration.numbers;
    });

    app.elements.namedItem('btn-uppercase').addEventListener('click', function () {
        btnToggle(this);
        configuration.uppercase = !configuration.uppercase;
    });

    app.elements.namedItem('btn-generate').addEventListener('click', function () {
        generatePassword();
    });

    app.elements.namedItem('input-password').addEventListener('click', function () {
        copyPassword();
    });

    /* Functions */

    function btnToggle (btn) {
        btn.classList.toggle('false');
        btn.childNodes[0].classList.toggle('fa-check');
        btn.childNodes[0].classList.toggle('fa-times');
    }

    function generatePassword () {
        document.getElementById('alert-copied').classList.remove('active');
        
        var finalCharacters = '';
        var password = '';

        for (property in configuration) {
            if (configuration[property] === true) {
                finalCharacters += characters[property] + ' ';
            }
        }

        finalCharacters = finalCharacters.trim();
        finalCharacters = finalCharacters.split(' ');
        
        for (var i = 0; i < configuration.characters; i++) {
            password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)]; 
        }

        app.elements.namedItem('input-password').value = password;
    }

    function copyPassword () {
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alert-copied').classList.add('active');

        setTimeout(function() {
            document.getElementById('alert-copied').classList.remove('active');
        }, 2000);
    }

    generatePassword();
}
)();