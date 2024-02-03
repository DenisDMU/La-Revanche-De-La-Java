$(document).ready(function(){
    //Tout d'abord, on selectionne chaque élement du form et c'est plus propre de déclarer ses variables au début de son code :)
    //Et surtout, ça peut servir à l'avenir pour d'autres fonctions 
    let nom = document.getElementById('nom');
    let prenom = document.getElementById('prenom');
    let email = document.getElementById('email');
    let sujet = document.getElementById('sujet');
    let message = document.getElementById('message');
    let boubou = document.getElementById('submit');
    
    
    
        //Exercice 1 = Activer bouton submit quand les champs sont remplis
    function formScan(){
        //On fait un booléen sur la valeur des inputs, en disant que différent de rien, c'est Ok, sinon, c'est pas Ok
            if(nom.value != '' && prenom.value != '' && email.value != '' && sujet.value != '' && message.value != ''){
                return true;
            }else{
                return false;
            };
        };

        //Ensuite, on fait une fonction pour pouvoir remove l'attribut disabled sur le bouton submit suivant la logique
        //de notre fonction qui permet d'analyser si la valeur des champs est vide ou non
    function boutonDeverouilleToi(){
        if(formScan()){
            boubou.removeAttribute("disabled")
        }else{
            boubou.setAttribute("disabled","disabled")
        };
    };
    
    //On a plus qu'a crée un event sur chaque input qui ecoute (drôle de mot !) avec blur si le champs est rempli avec notre fonction
    //Et ainsi, dévérouiller le bouton submit une fois que tout est rempli !
    nom.addEventListener('blur',boutonDeverouilleToi);
    prenom.addEventListener('blur',boutonDeverouilleToi);
    email.addEventListener('blur',boutonDeverouilleToi);
    sujet.addEventListener('blur',boutonDeverouilleToi);
    message.addEventListener('blur',boutonDeverouilleToi);

    //Et maintenant, on passe à la suite, la requête Ajax en jquery
    $('button[name="submit"]').on('click',function(){
        //On crée une variable  pour stocker les datas du forms
        let formData = new FormData ($('form[name="login"]')[0]);
        //On lance l'ajax
        $.ajax({
            url:'formulaire.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success:function(notification){
                //J'ai choisi de faire avec If et Else if, mais, le switch était tout aussi envisageable
                //et peut être plus simple, mais on fait avec les moyens du bord
                //On affiche le message en alert parce que c'est plus drôle
                //Et ensuite, on change la couleur des bordures pour les erreurs avec le .css grâce à jquery
                //Enfin, on disable les champs si le formulaire est complété comme il faut sans oubli de la part de notre cher utilisateur
               if(notification == 1){
                alert('Tout est ok ! Merci pour tes infos gratuites !')
                $('#nom ,#prenom,#email,#sujet,#message ,#submit').attr('disabled','disabled');
               }else if(notification == 2){
                    alert('Entre ton petit nom, mon Loulou ')
                    $('input[name="nom"]').css('border','3px solid red');
               }else if (notification == 3){
                alert('Cette fois, c\' est ton prenom qu\' il manque !');
                $('input[name="prenom"]').css('border','3px solid red')
               }else if (notification == 4){
                alert('Hé ho, tu as oublié ton email !')
                $('input[name="email"]').css('border','3px solid red')
               }else if (notification == 5){
                    alert('C\'est quoi ton sujet ?')
                    $('input[name="sujet"]').css('border','3px solid red')
               }else if(notification == 6){
                alert('Oublie pas de nous laisser un message après le bip');
                $('textarea[name="message"]').css('border','3px solid red')
               }
            }
        })
        return false;
    })
    //Voila, on en a fini avec le rattrapage !
       
    });