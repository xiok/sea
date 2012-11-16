<?php

/**
 * This is the model class for table "tbl_pregunta".
 *
 * The followings are the available columns in table 'tbl_pregunta':
 * @property integer $preg_id
 * @property integer $preg_tida
 * @property integer $preg_comp
 * @property integer $preg_bopa
 * @property string $preg_bopa_numparte
 * @property string $preg_orden
 * @property string $preg_detallepregunta
 * @property string $preg_observacion
 * @property string $preg_numerocomp1
 * @property string $preg_comp2
 * @property string $preg_numerocomp2
 * @property string $preg_comp3
 * @property string $preg_numerocomp3
 */
class tbl_pregunta extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return tbl_pregunta the static model class
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
		return 'tbl_pregunta';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('preg_tida, preg_comp, preg_bopa, preg_bopa_numparte', 'required'),
			array('preg_tida, preg_comp, preg_bopa', 'numerical', 'integerOnly'=>true),
			array('preg_bopa_numparte', 'length', 'max'=>11),
			array('preg_orden, preg_numerocomp1, preg_comp2, preg_numerocomp2, preg_comp3, preg_numerocomp3', 'length', 'max'=>10),
			array('preg_detallepregunta', 'length', 'max'=>200),
			array('preg_observacion', 'length', 'max'=>150),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('preg_id, preg_tida, preg_comp, preg_bopa, preg_bopa_numparte, preg_orden, preg_detallepregunta, preg_observacion, preg_numerocomp1, preg_comp2, preg_numerocomp2, preg_comp3, preg_numerocomp3', 'safe', 'on'=>'search'),
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
			'preg_id' => 'Preg',
			'preg_tida' => 'Preg Tida',
			'preg_comp' => 'Preg Comp',
			'preg_bopa' => 'Preg Bopa',
			'preg_bopa_numparte' => 'Preg Bopa Numparte',
			'preg_orden' => 'Preg Orden',
			'preg_detallepregunta' => 'Preg Detallepregunta',
			'preg_observacion' => 'Preg Observacion',
			'preg_numerocomp1' => 'Preg Numerocomp1',
			'preg_comp2' => 'Preg Comp2',
			'preg_numerocomp2' => 'Preg Numerocomp2',
			'preg_comp3' => 'Preg Comp3',
			'preg_numerocomp3' => 'Preg Numerocomp3',
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

		$criteria->compare('preg_id',$this->preg_id);
		$criteria->compare('preg_tida',$this->preg_tida);
		$criteria->compare('preg_comp',$this->preg_comp);
		$criteria->compare('preg_bopa',$this->preg_bopa);
		$criteria->compare('preg_bopa_numparte',$this->preg_bopa_numparte,true);
		$criteria->compare('preg_orden',$this->preg_orden,true);
		$criteria->compare('preg_detallepregunta',$this->preg_detallepregunta,true);
		$criteria->compare('preg_observacion',$this->preg_observacion,true);
		$criteria->compare('preg_numerocomp1',$this->preg_numerocomp1,true);
		$criteria->compare('preg_comp2',$this->preg_comp2,true);
		$criteria->compare('preg_numerocomp2',$this->preg_numerocomp2,true);
		$criteria->compare('preg_comp3',$this->preg_comp3,true);
		$criteria->compare('preg_numerocomp3',$this->preg_numerocomp3,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}