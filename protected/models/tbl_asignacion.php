<?php

/**
 * This is the model class for table "tbl_asignacion".
 *
 * The followings are the available columns in table 'tbl_asignacion':
 * @property integer $asig_mun
 * @property integer $asig_bole
 * @property string $asig_fechaini
 * @property string $asig_fechafin
 * @property string $asig_observacion
 * @property string $asig_fecmod
 */
class tbl_asignacion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return tbl_asignacion the static model class
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
		return 'tbl_asignacion';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('asig_mun, asig_bole, asig_fechaini, asig_fechafin', 'required'),
			array('asig_mun, asig_bole', 'numerical', 'integerOnly'=>true),
			array('asig_observacion', 'length', 'max'=>255),
			array('asig_fechaini, asig_fechafin, asig_fecmod', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('asig_mun, asig_bole, asig_fechaini, asig_fechafin, asig_observacion, asig_fecmod', 'safe', 'on'=>'search'),
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
			'asig_mun' => 'Asig Mun',
			'asig_bole' => 'Asig Bole',
			'asig_fechaini' => 'Asig Fechaini',
			'asig_fechafin' => 'Asig Fechafin',
			'asig_observacion' => 'Asig Observacion',
			'asig_fecmod' => 'Asig Fecmod',
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

		$criteria->compare('asig_mun',$this->asig_mun);
		$criteria->compare('asig_bole',$this->asig_bole);
		$criteria->compare('asig_fechaini',$this->asig_fechaini,true);
		$criteria->compare('asig_fechafin',$this->asig_fechafin,true);
		$criteria->compare('asig_observacion',$this->asig_observacion,true);
		$criteria->compare('asig_fecmod',$this->asig_fecmod,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}