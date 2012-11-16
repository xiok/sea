<?php

class tbl_departamentoTest extends WebTestCase
{
	public $fixtures=array(
		'tbl_departamentos'=>'tbl_departamento',
	);

	public function testShow()
	{
		$this->open('?r=tbl_departamento/view&id=1');
	}

	public function testCreate()
	{
		$this->open('?r=tbl_departamento/create');
	}

	public function testUpdate()
	{
		$this->open('?r=tbl_departamento/update&id=1');
	}

	public function testDelete()
	{
		$this->open('?r=tbl_departamento/view&id=1');
	}

	public function testList()
	{
		$this->open('?r=tbl_departamento/index');
	}

	public function testAdmin()
	{
		$this->open('?r=tbl_departamento/admin');
	}
}
