<?php

class tbl_gestionTest extends WebTestCase
{
	public $fixtures=array(
		'tbl_gestions'=>'tbl_gestion',
	);

	public function testShow()
	{
		$this->open('?r=tbl_gestion/view&id=1');
	}

	public function testCreate()
	{
		$this->open('?r=tbl_gestion/create');
	}

	public function testUpdate()
	{
		$this->open('?r=tbl_gestion/update&id=1');
	}

	public function testDelete()
	{
		$this->open('?r=tbl_gestion/view&id=1');
	}

	public function testList()
	{
		$this->open('?r=tbl_gestion/index');
	}

	public function testAdmin()
	{
		$this->open('?r=tbl_gestion/admin');
	}
}
