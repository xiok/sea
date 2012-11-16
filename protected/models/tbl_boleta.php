<?php

/**
 * This is the model class for table "tbl_boleta".
 *
 * The followings are the available columns in table 'tbl_boleta':
 * @property integer $bol_id
 * @property string $bol_codigo
 * @property string $bol_estado_cons
 * @property string $bol_fecha
 * @property string $bol_usuario
 * @property string $bol_tipo
 * @property integer $bol_estado
 */
class tbl_boleta extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_boleta the static model class
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
		return 'tbl_boleta';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('bol_estado_cons, bol_fecha, bol_usuario, bol_tipo, bol_estado', 'required'),
			array('bol_estado', 'numerical', 'integerOnly'=>true),
			array('bol_estado_cons', 'length', 'max'=>10),
			array('bol_usuario', 'length', 'max'=>5),
			array('bol_tipo', 'length', 'max'=>30),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('bol_id, bol_codigo, bol_estado_cons, bol_fecha, bol_usuario, bol_tipo, bol_estado', 'safe', 'on'=>'search'),
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
			'bol_id' => 'Bol',
			'bol_codigo' => 'Bol Codigo',
			'bol_estado_cons' => 'Bol Estado Cons',
			'bol_fecha' => 'Bol Fecha',
			'bol_usuario' => 'Bol Usuario',
			'bol_tipo' => 'Bol Tipo',
			'bol_estado' => 'Bol Estado',
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

		$criteria->compare('bol_id',$this->bol_id);

		$criteria->compare('bol_codigo',$this->bol_codigo,true);

		$criteria->compare('bol_estado_cons',$this->bol_estado_cons,true);

		$criteria->compare('bol_fecha',$this->bol_fecha,true);

		$criteria->compare('bol_usuario',$this->bol_usuario,true);

		$criteria->compare('bol_tipo',$this->bol_tipo,true);

		$criteria->compare('bol_estado',$this->bol_estado);

		return new CActiveDataProvider('tbl_boleta', array(
			'criteria'=>$criteria,
		));
	}
}