import React, { Component } from 'react';
import PropTypes from 'proptypes';
import {
  AppRegistry,
  StyleSheet,
  VrButton, 
  NativeModules,
  Text,
  View,
} from 'react-360';
import {EmojiText, registerKeyboard} from 'react-360-keyboard';

var targetDate = '2019-02-05T00:00:00.001Z'
// new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10))
// console.log('1.index targetDate : ', targetDate)

// 3.) register the Keyboard in your AppRegistry
AppRegistry.registerComponent(...registerKeyboard);

export default class OpenSecureStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      email: '[>>OSS Terraform Request<<]'
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }
  onClick = () => {
    NativeModules.Keyboard.startInput({
      initialValue: '',
      placeholder: 'Your Email Invitation',
      emoji: false,
      sound: true,
      dictation: true,
      returnKeyLabel: 'MyEmail',
      tintColor: '#81D9FD'
    }).then(result => {
      const email = result && result.length? result : '[Holodeck upgrade FREE!]';
      this.setState({email})
    });
};
  render() {
    const countDown = this.state;

    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
        <Text style={styles.centerText}>Habitable Systems Found</Text>
          <Text style={styles.greeting}>
            <Text style={styles.centerText}>{this.addLeadingZeros(countDown.days)}</Text>
            <Text style={styles.centerText}>{countDown.days === 1 ? 'Day ' : 'Days '}</Text>

            <Text style={styles.centerText}>{this.addLeadingZeros(countDown.hours)}</Text>
            <Text>Hours </Text>

            <Text style={styles.centerText}>{this.addLeadingZeros(countDown.min)}</Text>
            <Text>Min </Text>

            <Text style={styles.centerText}>{this.addLeadingZeros(countDown.sec)}</Text>
            <Text>Sec</Text>
          </Text>
          <VrButton onClick={this.onClick}>
            <EmojiText style={styles.greeting}>{this.state.email}</EmojiText>
          </VrButton>
        </View>
      </View>
    );
  }
}

OpenSecureStorage.propTypes = {
  date: PropTypes.string.isRequired
};

OpenSecureStorage.defaultProps = {
  date: targetDate
};

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    // Fill the entire surface
    width: null,
    height: null,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    flex: .5,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    flex: .5,
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 20,
  },
});

AppRegistry.registerComponent('OpenSecureStorage', () => OpenSecureStorage);
