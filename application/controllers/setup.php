<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Setup extends MY_Controller {

  function __construct(){
    parent::__construct();
    $this->load->dbforge();
  }

  public function index()
  {
    $this->load->view('index');
  }

  public function index_get(){

  }
  public function database_get(){
  }

  public function database_post(){
    $post_data = file_get_contents("php://input");
    try{
      if ($this->dbforge->create_database($post_data,TRUE)){
        $response = array('type'  =>  'success','msg' =>  'Database created!');
      }
      else{
        $response = array('type'  =>  'danger','msg'  =>  'Database Not Created!');
      }
    }
    catch(Exception $e){
      // var_dump($e->getMessage());die;
      $response=array('type'  =>  'danger','msg'  =>  $e->getMessage());
    }
    $this->response($response);
  }
}
