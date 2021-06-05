import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import images from '../../config/images';
import {PoppinsTextRegular} from '../../components/Text';
import {RedButton, GradientButton} from '../../components/Button';
import {validateEmail, validateMobile} from '../../lib/validators';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import IconTextInput from '../../components/IconTextInput';

const window = Dimensions.get('window');
const {height, width} = window;

const ArticleScreen = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={gs.safeArea}>
      <View style={styles.container}>
        <PoppinsTextRegular color={2} fontSize={16}>
          Coming Soon
        </PoppinsTextRegular>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ArticleScreen.propTypes = {};

export default ArticleScreen;
