<?php
session_start();
if(!empty($_POST['nom']) && !empty($_POST['prenom']) && !empty($_POST['email']) && !empty($_POST['sujet']) && !empty($_POST['message']))
{
  $_SESSION['formulaire'] = json_encode($_POST);
  echo 1;
}
else if(empty($_POST['nom'])) echo 2;
else if(empty($_POST['prenom'])) echo 3;
else if(empty($_POST['email'])) echo 4;
else if(empty($_POST['sujet'])) echo 5;
else if(empty($_POST['message'])) echo 6;

?>