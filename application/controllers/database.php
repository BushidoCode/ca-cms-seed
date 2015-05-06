<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Database extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
   /**
 	* Set Configuration for Database
 	* @return [type] [description]
 	*/
 	public function config($database){
 		$data = '<?php
     ';
    $db_array= "array(
    	'dsn'	=> '',
    	'hostname' => 'localhost',
    	'username' => 'root',
    	'password' => 'root',
    	'database' => '".$database."',
    	'dbdriver' => 'mysqli',
    	'dbprefix' => '',
    	'pconnect' => FALSE,
    	'db_debug' => TRUE,
    	'cache_on' => FALSE,
    	'cachedir' => '',
    	'char_set' => 'utf8',
    	'dbcollat' => 'utf8_general_ci',
    	'swap_pre' => '',
    	'encrypt' => FALSE,
    	'compress' => FALSE,
    	'stricton' => FALSE,
    	'failover' => array(),
    	'save_queries' => TRUE
    )";

    $data.=$db_array;

 		if ( ! write_file(APPPATH.'config/file.php', $data))
 		{
 			echo('Unable to write the file');
 		}
 		else
 		{
 			echo('File written!');
 		}
 	}
}
