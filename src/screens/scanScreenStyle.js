
import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: 'white',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#99003d'
    backgroundColor: '#24338b'
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    padding: 16,
    color: '#13a5a3'
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white'
  },
  textTitle2: {
    fontWeight: 'bold',
    fontSize: 18,
    // paddingBottom: 20,
    textAlign: 'center',
    color: '#13a5a3'
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  },
  descText: {
    padding: 16,
    textAlign: 'justify',
    fontSize: 16
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: '#24338b',
    marginTop: 62,

    width: deviceWidth - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  }

});

export default styles;