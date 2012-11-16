<?php

/**
 * This is the model class for table "tbl_mensaje".
 *
 * The followings are the available columns in table 'tbl_mensaje':
 * @property integer $mens_id
 * @property string $mens_usu
 * @property string $mens_remitente
 * @property string $mens_destinatario
 * @property string $mens_asunto
 * @property string $mens_descripcion
 * @property string $mens_usu_des
 * @property string $mens_fecha
 * @property string $mens_estado
 */
class tbl_mensaje extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return tbl_mensaje the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_mensaje';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			// array('mens_usu, mens_remitente, mens_destinatario, mens_asunto, mens_descripcion, mens_usu_des, mens_fecha, mens_estado', 'required'),
			array('mens_usu, mens_remitente, mens_destinatario, mens_asunto, mens_descripcion, mens_usu_des, mens_fecha, mens_estado', 'required'),
			// array('mens_usu, mens_usu_des', 'length', 'max'=>5),
			// array('mens_remitente, mens_destinatario, mens_asunto', 'length', 'max'=>255),
			// array('mens_estado', 'length', 'max'=>1),
			// array('mens_descripcion', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			// array('mens_id, mens_usu, mens_remitente, mens_destinatario, mens_asunto, mens_descripcion, mens_usu_des, mens_fecha, mens_estado', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'mens_id' => 'Mens',
			'mens_usu' => 'Mens Usu',
			'mens_remitente' => 'Mens Remitente',
			'mens_destinatario' => 'Mens Destinatario',
			'mens_asunto' => 'Mens Asunto',
			'mens_descripcion' => 'Mens Descripcion',
			'mens_usu_des' => 'Mens Usu Des',
			'mens_fecha' => 'Mens Fecha',
			'mens_estado' => 'Mens Estado',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('mens_id',$this->mens_id);
		$criteria->compare('mens_usu',$this->mens_usu,true);
		$criteria->compare('mens_remitente',$this->mens_remitente,true);
		$criteria->compare('mens_destinatario',$this->mens_destinatario,true);
		$criteria->compare('mens_asunto',$this->mens_asunto,true);
		$criteria->compare('mens_descripcion',$this->mens_descripcion,true);
		$criteria->compare('mens_usu_des',$this->mens_usu_des,true);
		$criteria->compare('mens_fecha',$this->mens_fecha,true);
		$criteria->compare('mens_estado',$this->mens_estado,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}