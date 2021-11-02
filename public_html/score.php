<?php 
 $player_name = strip_tags( trim( $_POST[name] ) ); 
 $player_score = strip_tags( trim( (int)$_POST[score]) ); 
 $player_array = array("name"=>$player_name, "score"=>$player_score);
 $highscoreJSON = file_get_contents("./score/score.json");
 $highscore_array = json_decode($highscoreJSON, true);
 $key = 0;
 $highscores = array();
 if ($player_score > $highscore_array[9][score]) {
 	 foreach($highscore_array as $k => $value) {
 	 	 $score = $value[score];
 	 	 if ($score >= $player_score) {
 	 	 	 $highscores[$k] = $value;
 	 	 }
 	 	 if ($score < $player_score) {
 	 	 	 // Beat the score
 	 	 	 $key = $k;
 	 	 	 $highscores[$k] = $player_array;
 	 	 	 for ($i = $key; $i < 9; $i++) {
 	 	 	 	 $highscores[$i + 1] = $highscore_array[$i];
 	 	 	 }
 	 	 break;
 	 	}
 	 }
 	 $jsonscores = json_encode($highscores);
 	 file_put_contents("./score/score.json", $jsonscores);
 	 var_dump("Howdy Partner!");
 }
 else {
 	 var_dump("No high score");
 }
 ?>