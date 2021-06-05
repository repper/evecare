import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Shadow} from 'react-native-neomorph-shadows';
import HTML from 'react-native-render-html';

import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium, PoppinsTextSemiBold} from '../../components/Text';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import settings from '../../config/settings';
//Own Code
const {width, height} = Dimensions.get('window');

const InfoModal = props => {
  const {title, htmlContent} = infoContent(props.contentKey);
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={props.backdropColor}
      onBackButtonPress={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}
      backdropOpacity={props.backdropOpacity}
      //animationIn={props.animationIn}
      animationInTiming={props.animationInTiming}
      //animationOut={props.animationOut}
      animationOutTiming={props.animationOutTiming}
      useNativeDriverForBackdrop={true}
      propagateSwipe={true}
      style={styles.modal}
      useNativeDriver={props.useNativeDriver}
    >
      <Shadow style={styles.wrpr}>
        <View style={styles.lineWrpr}>
          <View style={styles.headerLine} />
        </View>
        <View style={styles.boxWrpr}>
          <View style={styles.headingWrpr}>
            <PoppinsTextMedium color={3} fontSize={18}>
              {`${title}`}
            </PoppinsTextMedium>
          </View>
          <ScrollView
            contentContainerStyle={[cs.flexGrow, styles.scrollView]}
            onContentSizeChange={onScrollContentSizeChange}
          >
            <HTML
              html={htmlContent}
              contentWidth={width}
              baseFontStyle={styles.webTextStyle}
              renderers={{
                b: boldCustomRenderer,
                center: centerViewCustomRenderer,
              }}
            />
          </ScrollView>
        </View>
      </Shadow>
    </Modal>
  );
};

const boldCustomRenderer = (htmlAttribs, children, convertedCSSStyles, passProps) => {
  return (
    <PoppinsTextSemiBold color={3} key={passProps.key}>
      {children}
    </PoppinsTextSemiBold>
  );
};

const centerViewCustomRenderer = (htmlAttribs, children, convertedCSSStyles, passProps) => {
  return <View style={cs.flexAlignCenter}>{children}</View>;
};

const onScrollContentSizeChange = (contentWidth, contentHeight) => {};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(20),
  },
  wrpr: {
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    width: width,
    height: height * 0.8,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    borderRadius: moderateScale(60),
  },
  lineWrpr: {
    alignItems: 'center',
  },
  headerLine: {
    height: moderateScale(6),
    backgroundColor: colors.tnc_text_color,
    borderRadius: moderateScale(6),
    width: moderateScale(width * 0.3),
  },
  boxWrpr: {
    width: width,
    height: height * 0.8,
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(43),
    borderTopRightRadius: moderateScale(43),
  },
  headingWrpr: {
    alignItems: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
  },
  scrollView: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  webTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    textAlign: 'justify',
  },
});

InfoModal.defaultProps = {
  contentKey: 'obstetricsHistory',
  visible: false,
  backdropColor: colors.white,
  onBackdropPress: () => {},
  backdropOpacity: 0.6,
  animationIn: 'fadeIn',
  animationInTiming: 200,
  animationOut: 'fadeOut',
  animationOutTiming: 200,
  useNativeDriver: true,
};

const infoContent = key => {
  let htmlContent = '';
  let title = '';
  switch (key) {
    case 'period_length':
      title = '';
      htmlContent = `<b><u>Period Length</u></b>
        <ul>
        <li>The first day of a woman's <B>period</B> is day 1 of the menstrual <b>cycle</b>."<b>Periods</b> last around 2 to 7 days, and women lose about 3 to 5 tablespoons of blood in a <b>period</b>," says Belfield.</li>
        </ul>
        <b><u>Cycle Length</u></b>
        <ul>
        <li>The menstrual cycle is the monthly hormonal cycle a female’s body goes through to prepare for pregnancy. Your menstrual cycle is counted from the first day of your period up to the first day of your next period. Your hormone levels (estrogen and progesterone) usually change throughout the menstrual cycle and can cause menstrual symptoms. The typical menstrual cycle is 28 days long, but each woman is different. Also, a woman’s menstrual cycle length might be different from month-to-month. Your periods are still “regular” if they usually come every 24 to 38 days. This means that the time from the first day of your last period up to the start of your next period is at least 24 days but not more than 38 days. Some women’s periods are so regular that they can predict the day and time that their periods will start. Other women are regular but can only predict the start of their period  within a few days.<br><br>Your cycles may change in different ways as you get older. Often, periods are heavier when you are younger (in your teens) and usually get lighter in your 20s and 30s. This is normal. <b>For a few years after your first period</b>, menstrual cycles longer than 38 days are common. Girls usually get more regular cycles within three years of starting their periods. If longer or irregular cycles last beyond that, see your doctor or nurse to rule out a health problem, such as polycystic ovary syndrome (PCOS). <b>In your 20s and 30s</b>, your cycles are usually regular and can last anywhere from 24 to 38 days. <b>In your 40s</b>, as your body starts the transition to menopause, your cycles might become irregular. Your menstrual periods might stop for a month or a few months and then start again. They also might be shorter or last longer than usual, or be lighter or heavier than normal. Talk to your doctor or nurse if you have menstrual cycles that are longer than 38 days or shorter than 24 days, or if you are worried about your menstrual cycle.</li>
        </ul>
        <b><u>Ovulation & Fertile</u></b>
        <ul>
        <li>Ovulation is when the ovary releases an egg so it can be fertilized by a sperm in order to make a baby. A woman is most likely to get pregnant if she has sex without birth control in the three days before and up to the day of ovulation (since the sperm are already in place and ready to fertilize the egg as soon as it is released). A man’s sperm can live for 3 to 5 days in a woman’s reproductive organs, but a woman’s egg lives for just 12 to 24 hours after ovulation. Each woman’s cycle length may be different, and the time between ovulation and when the next period starts can be anywhere from one week (7 days) to more than 2 weeks (19 days). At different times in a woman’s life, ovulation may or may not happen: Women who are pregnant do not ovulate. Women who are breastfeeding may or may not ovulate. Women who are breastfeeding should talk to their doctor about birth control methods if they do not want to get pregnant. During perimenopause, the transition to menopause, you may not ovulate every month. After menopause you do not ovulate.</li>
        </ul>
        `;
      break;
    case 'obstetricsHistory':
      title = 'Pregnancy History';
      htmlContent =
        'Pregnancy history involves the history about current and previous pregnancies of Women. It Includes Information on all types of deliveries, abortions, live birth, stillbirth and ectopic pregnancy.';
      break;
    case 'obs_total_pregnancy':
      title = 'Total Pregnancy';
      htmlContent =
        'Pregnancy is the term used to describe the period in which a fetus develops inside a woman’s uterus.pregnancy usually last for about 40weeks/9months from last menstrual period.Total number of pregnancy indicates the sum of live births, abortions,and fetal deaths (Still birth).';
      break;
    case 'obs_normal_delivery':
      title = 'Normal Delivery';
      htmlContent =
        'A spontaneous <b>vaginal delivery</b> occurs when a pregnant female goes into <b>labor</b> without the use of drugs or techniques to induce <b>labor</b>, and delivers her baby in the <b>normal</b> manner, without forceps, vacuum extraction, or a cesarean section in the head down position between 37 and 42 completed weeks of pregnancy';
      break;
    case 'obs_vaccum_delivery':
      title = 'Vacuum extraction';
      htmlContent =
        'A vacuum device is a suction cup with a handle attached. The suction cup is placed in the vagina and applied to the top of the baby’s head. Gentle, well-controlled traction is used to help guide the baby out of the birth canal while the person keep pushing.';
      break;
    case 'obs_forceps_delivery':
      title = 'Forcep Delivery';
      htmlContent =
        'Forceps look like two large spoons. They are inserted into the vagina and placed around the baby’s head. The forceps are used to apply gentle traction to help guide the baby’s head out of the birth canal while the person keep pushing.';
      break;
    case 'obs_cesarean_delivery':
      title = 'Caesarean Delivery(LSCS)';
      htmlContent = `It is the delivery of a baby through incisions made in the mother’s abdomen and uterus.<br><br>The following situations are some of the reasons why a cesarean birth is performed:
        <ul>
        <li>Failure of labor to progress—Contractions may not open the cervix enough for the baby to move into the vagina.</li>
        <li>Concern for the baby—For instance, the umbilical cord may become pinched or compressed or fetal monitoring may detect an abnormal heart rate</li>
        <li>Multiple pregnancy—If a woman is pregnant with twins, a cesarean birth may be necessary if the babies are being born too early, are not in good positions in the uterus, or if there are other problems. The likelihood of having a cesarean birth increases with the number of babies a woman is carrying. Problems with the placenta</li>
        <li>A very large baby</li>
        <li>Breech presentation</li>
        <li>Maternal infections, such as human immunodeficiency virus or herpes</li>
        <li>Maternal medical conditions, such as diabetes mellitus or high blood pressure</li>  
        </ul>`;
      break;
    case 'obs_abortion_termination':
      title = 'Abortion (Termination)';
      htmlContent =
        'Termination of Pregnancy is the ending of a pregnancy by removal or expulsion of an embryo or fetus by taking medication or by having a surgical procedure.';
      break;
    case 'obs_abortion_misscarraige':
      title = 'Abortion (Miscarriage)';
      htmlContent =
        'A miscarriage is the spontaneous loss of a fetus before the 20th week of pregnancy. Miscarriage is a naturally occurring event without intervention.';
      break;
    case 'obs_live_birth':
      title = 'Live Birth';
      htmlContent =
        'A live birth is the birth of a child who showed any sign of life, the number of live births is the number of births excluding stillbirths.';
      break;
    case 'obs_still_birth':
      title = 'Still Birth';
      htmlContent = 'The number fetal death at or after 20 or 28 weeks of pregnancy.';
      break;
    case 'obs_ectopic_pregnancy':
      title = 'Ectopic Pregnancy';
      htmlContent = `a pregnancy in which the fetus develops outside the uterus, typically in a fallopian tube. The fertilised egg can't survive outside the uterus. If left to grow, it may damage nearby organs and cause life-threatening loss of blood.`;
      break;
    case 'dashboard_info':
      title = 'Dashboard Info';
      htmlContent = `The Dashboard screen represents your monthly Cycle related information and approximate predictions based on your input and past cycle data’s in an easy to understand fashion<br><br><center><img src=https://access.evecare.app/mobile-assets/period-days.png width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center>i) The red bar on the outer circle represents the average duration of your period length. The first day of a woman's <b>period</b> is day 1 of the menstrual <b>cycle</b>. <b>Periods</b> last around 2 to 8 days<br><br><center><img src=https://access.evecare.app/mobile-assets/ovulation-days.png width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center>ii) The yellow bar on the outer circle represents the potential average fertile days during your monthly cycle.<br><br><center><img src=https://access.evecare.app/mobile-assets/ovulation-days.png width="${moderateScale(
        60,
      )}" height="${moderateScale(
        60,
      )}"><br><br>The flower icon  represents the potential ovulation day. Ovulation is when the ovary releases an egg so it can be fertilized by a sperm in order to make a baby. That egg survives for up to 48 hours, this short time may be considered the ovulation period.<br><br>The total fertile period is how long the egg is fertile and how long sperm can wait for the egg combined. This is known as your fertile window.<br><b>Example:</b> If your average menstrual <b>cycle</b> is 28 <b>days</b>, you ovulate around day 14, and your most <b>fertile days</b> are <b>days</b> 12, 13 and 14. If your average menstrual <b>cycle</b> is 35 <b>days ovulation</b> happens around day 21 and your most <b>fertile days</b> are <b>days</b> 19, 20 and 21.<br><br>Each woman’s cycle length may be different, and the time between ovulation and when the next period starts can be anywhere from one week (7 days) to more than 2 weeks (19 days).<br><br><center><img src=https://access.evecare.app/mobile-assets/days-indicator.png width="${moderateScale(
        60,
      )}" height="${moderateScale(
        60,
      )}">iii) The small circle on the outer circle tells you the actual day of the current cycle. You can move the circle to see the expected changes to occur as the current cycle progress<br><br><center><img src=https://access.evecare.app/mobile-assets/circle-info.png width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}">iv) The centre of the circle provides you information on the approximate number of days left for the current cycle and date when to expect the next cycle. This information will always keep you in charge to manage and plan around your periods`;
      break;
    case 'medicalHistory':
      title = 'Medical History';
      htmlContent = `Medical history is a record of a past medical problems and treatments that a person has experienced. It’s an important tool in the understanding and management of current health problems.`;
      break;
    case 'med_pcod':
      title = 'Polycystic Ovarian Disease (PCOD)';
      htmlContent = `PCOD, also known as polycystic ovarian syndrome (PCOS), is a common health problem caused by an imbalance of reproductive hormones which impact the function of ovaries. The Normal function of ovaries is to release the egg as part of a healthy menstrual cycle. PCOD may not allow egg to develop as it should be or it may not be released during ovulation as it should be. PCOD can be one of cause for missed or irregular menstrual periods and also one of the most common causes of infertility in women.<br><br><b>Causes:-</b><br>
      <ul>
      <li>Though the exact cause of PCOD is not known, experts and researches think that genetics may play a role.Women with PCOD have high levels of androgens also called "male hormones," although all women make small amounts of androgens higher level of Androgen prevents the ovaries from releasing an egg (Ovulation) during menstrual cycle.</li>
      <li><b>High levels of insulin-</b> Insulin is a hormone that controls how the food you eat is changed into energy.  Insulin resistance is when the body's cells do not respond normally to insulin. As a result, your insulin blood levels become higher than normal. Many women with PCOD have insulin resistance, especially those who have overweight or obesity, have unhealthy eating habits, do not get enough physical activity, and have a family history of diabetes (usually type 2 diabetes). Over time, insulin resistance can lead to type 2 diabetes.</li>
      </ul><b>Symptoms:-</b><br>
      <ol>
      <li><b>Irregular menstrual Cycle -</b> Women with PCOD may miss periods or have fewer periods (fewer than eight in a year) Or, their periods may come every 21 days or more often. Some women with PCOD stop having menstrual periods.</li>
      <li><b>Too much hair</b> on the face, Chin, or parts of the body where men usually have hair. This is called "hirsutism." Hirsutism affects up to 70% of women with PCOD.</li>
      <li><b>Acne</b> on the face, chest, and upper back</li>
      <li><b>Thinning hair</b> or hair loss on the scalp; male-pattern baldness</li>
      <li><b>Weight gain</b> or difficulty losing weight</li>
      <li><b>Darkening of skin,</b> particularly along neck creases, in the groin, and underneath breasts</li>
      <li><b>Skin tags,</b> which are small excess flaps of skin in the armpits or neck area</li>
      </ol>`;
      break;
    case 'med_pid':
      title = 'Pelvic inflammatory Disease (PID)';
      htmlContent = `PID is an infection of a woman’s reproductive organs. Usually PID is caused by bacteria from sexually transmitted infections (STIs). Sometimes PID is caused by normal bacteria found in the vagina. If left untreated, PID can cause problems getting pregnant, problems during pregnancy, and long-term pelvic pain.<br><br><b>Causes:-</b> Your risk for PID is higher if you:
      <ol>
      <li>Have had an STI</li>
      <li>Have had PID before</li>
      <li>Are younger than 25 and have sex. PID is most common in women 15 to 24 years old.</li>
      <li>Have more than one sex partner or have a partner who has multiple sexual partners</li>
      <li>Douche. Douching can push bacteria into the reproductive organs and cause PID. Douching can also hide the signs of PID.</li>
      <li>Recently had an intrauterine device (IUD) inserted. The risk of PID is higher for the first few weeks only after insertion of an IUD. PID is rare after that time period. Getting tested for STIs before the IUD is inserted lowers your risk for PID.</li>
      </ol><b>Symptoms:-</b> Many women do not know they have PID, because they do not have any signs or symptoms. When symptoms do happen, they can be mild or more serious. Signs and symptoms include:
      <ol>
      <li>Pain in the lower abdomen (this is the most common symptom)</li>
      <li>Fever (100.4° F or higher)</li>
      <li>Vaginal discharge that may smell foul</li>
      <li>Painful sex</li>
      <li>Pain when urinating</li>
      <li>Irregular menstrual periods</li>
      <li>Pain in the upper right abdomen (this is rare) If you think that you may have PID, see a doctor as soon as possible</li>
      </ol>`;
      break;
    case 'med_endometriosis':
      title = 'Endometriosis';
      htmlContent = `Endometriosis, sometimes called "endo," is a common health problem in women. It gets its name from the word endometrium, the tissue that normally lines the uterus or womb. Endometriosis happens when tissue similar to the lining of the uterus grows outside of your uterus and on other areas in your body where it doesn't belong. Most often, endometriosis is found on the:
      <ul>
      <li>Ovaries</li>
      <li>Fallopian tubes</li>
      <li>Tissues that hold the uterus in place</li>
      <li>Outer surface of the uterus</li>
      <li>Other sites for growths can include the vagina, cervix, vulva, bowel, bladder, or rectum. Rarely, endometriosis appears in other parts of the body, such as the lungs, brain, and skin.</li>
      </ul><b>Causes:-</b> No one knows for sure what causes this disease, researchers are studying possible causes:
      <ol>
      <li><b>Problems with menstrual period flow.</b> Retrograde (backward) menstrual flow is the most likely cause of endometriosis. Some of the tissue shed during the period flows through the fallopian tube into other areas of the body, such as the pelvis.</li>
      <li><b>Genetic factors.</b> Because endometriosis runs in families, it may be inherited in the genes.</li>
      <li><b>Immune system problems.</b> A faulty immune system may fail to find and destroy endometrial tissue growing outside of the uterus. Immune system disorders and certain cancers are more common in women with endometriosis.</li>
      <li><b>Hormones.</b> The hormone estrogen appears to promote endometriosis. Research is looking at whether endometriosis is a problem with the body's hormone system.</li>
      <li><b>Surgery.</b> During a surgery to the abdominal area, such as a Cesarean (C-section) or hysterectomy, endometrial tissue could be picked up and moved by mistake. For instance, endometrial tissue has been found in abdominal scars.</li>
      </ol><b>Symptoms:-</b>
      <ol>
      <li><b>Pain.</b> This is the most common symptom. Women with endometriosis may have many different kinds of pain, these include:
      <ul>
      <li>Very painful menstrual cramps. The pain may get worse over time.</li>
      <li>Chronic (long-term) pain in the lower back and pelvis</li>
      <li>Pain during or after sex. This is usually described as a "deep" pain and is different from pain felt at the entrance to the vagina when penetration begins.</li>
      <li>Intestinal pain</li>
      <li>Painful bowel movements or pain when urinating during menstrual periods. In rare cases, you may also find blood in your stool or urine.</li>
      </ul>
      </li>
      <li><b>Bleeding or spotting</b> between menstrual periods. This can be caused by something other than endometriosis. If it happens often, you should see your doctor.</li>
      <li><b>Infertility</b> or not being able to get pregnant.</li>
      <li><b>Stomach (digestive) problems.</b> These include diarrhea, constipation, bloating, or nausea, especially during menstrual periods.</li>
      </ol`;
      break;
    case 'med_menorrhagia':
      title = 'Menorrhagia';
      htmlContent = `<b>Menorrhagia</b> is the medical term for menstrual periods with abnormally heavy or prolonged bleeding. Although heavy menstrual bleeding is a common concern, most women don't experience blood loss severe enough to be defined as <b>menorrhagia.</b><br><br>The average woman loses about 2 to 3 tablespoons of blood during her period. Your periods may be lighter or heavier than the average amount. What is normal for you may not be the same for someone else. Also, the flow may be lighter or heavier from month to month. Your periods may also change as you get older. Some women have heavy bleeding during perimenopause, the transition to menopause. Heavy menstrual bleeding may include:
      <ol>
      <li>Bleeding through one or more pads or tampons every 1 to 2 hours</li>
      <li>Passing blood clots larger than the size of quarters</li>
      <li>Bleeding that often lasts longer than 8 days</li>
      </ol><b>Causes:-</b>
      <ol>
      <li><b>Problems with ovulation.</b> In a normal menstrual cycle, your uterine lining builds up and thickens to prepare for pregnancy. If pregnancy does not happen, the uterine lining leaves your body during your period. If your hormones get out of balance or if you do not ovulate, the uterine lining can build up too much and bleed heavily and in an unpredictable pattern.</li>
      <li><b>Problems with the uterine lining.</b> If your hormones or uterine lining get out of balance, the uterine lining can bleed too much. This can cause heavy bleeding as the lining is pushed out during the next menstrual period.</li>
      <li><b>Thyroid problems.</b> Heavy bleeding can be a sign of hypothyroidism (hy-poh-THY-roi-diz-uhm), or underactive thyroid. Hypothyroidism happens when your thyroid does not make enough thyroid hormones.</li>
      <li><b>Uterine fibroids.</b> Fibroids are made of muscle tissue that grows in or on the wall of the uterus. They are almost always not cancer. They can cause pain and heavy or irregular bleeding.</li>
      <li><b>Uterine polyps.</b> Polyps are an overgrowth of the endometrial tissue that lines the inside of the uterine wall. They are usually small. They are usually not cancer but can cause heavy or long periods.</li>
      <li><b>Certain medicines.</b> Some medicines, such as blood thinners, can cause heavy or long periods.</li>
      <li><b>Pregnancy problems.</b> Unusual or not regular heavy bleeding can be caused by a miscarriage (an early pregnancy that ends) or an ectopic pregnancy.  An ectopic pregnancy is when the fertilized egg implants outside of the uterus (womb) where it does not belong, putting a woman’s life in danger. Ectopic pregnancies can never end in a healthy pregnancy and are a medical emergency.</li>
      <li><b>Bleeding disorders.</b> Hemophilia and von Willebrand’s disease are inherited bleeding disorders that cause heavy bleeding during periods. For many women, heavy menstrual bleeding is the only sign they have a bleeding disorder.</li>
      <li><b>Obesity.</b> The extra fat in the body makes the hormone estrogen. The extra estrogen changes the normal menstrual cycle and can cause missed, irregular, or heavy periods.</li>
      </ol><b>Symptoms:-</b>
      <ol>
      <li>Your period lasts longer than 8 days.</li>
      <li>You bleed through one or more pads or tampons every 1 to 2 hours.</li>
      <li>You feel dizzy, lightheaded, weak, or tired, or if you have chest pain or trouble breathing during or after your period. These can be symptoms of anemia. Anemia is a condition that happens when your blood cannot carry enough oxygen to your body because of a lack of iron.</li>
      <li>You pass menstrual blood clots larger than the size of quarters. (It is normal to pass clots the size of quarters or smaller.)</li>
      </ol>`;
      break;
    case 'med_metrorrhagia':
      title = 'Metrorrhagia';
      htmlContent = `Metrorrhagia is an Uterine Unusual (abnormal) bleeding  at irregular intervals, particularly between the expected menstrual periods. Unusual or abnormal bleeding is any bleeding that is different from your typical menstrual period or happens when you do not have your period.
      <ol>
      <li><b>Hormonal changes.</b> Changing hormone levels during puberty and perimenopause, the transition to menopause, can cause longer, heavier periods. They can also cause irregular cycles.</li>
      <li><b>Endometriosis.</b> This condition happens when the lining of the uterus grows outside of the uterus where it does not belong.</li>
      <li><b>Ovarian cysts.</b> Unusual bleeding may be a sign of an ovarian cyst that has ruptured (burst).</li>
      <li><b>Cancer, such as uterine, cervical, and ovarian cancer.</b> Any vaginal bleeding after menopause can be a sign of a serious health problem, including ovarian, cervical or uterine cancer.</li>
      </ol><b>Symptoms:-</b>
      <ol>
      <li>Bleeding after sex, more than once</li>
      <li>Spotting or bleeding anytime in the menstrual cycle other than during your period</li>
      <li>Bleeding during your period that is heavier or lasts longer than normal</li>
      <li>Bleeding after menopause</li>
      </ol>`;
      break;
    case 'med_uterine_fibroid':
      title = 'Uterine Fibroid';
      htmlContent = `Fibroids are muscular tumors that grow in the wall of the uterus (womb). Another medical term for fibroids is leiomyoma or just "myoma". Fibroids are almost always benign (not cancerous). Fibroids can grow as a single tumor, or there can be many of them in the uterus. They can be as small as an apple seed or as big as a grapefruit. In unusual cases they can become very large.<br><br><b>Causes:-</b> There are factors that can increase a woman's risk of developing fibroids.
        <ol>
        <li>Hormonal (affected by estrogen and progestrone levels)</li>
        <li>Genetic (runs in families)</li>
        <li><b>Age.</b> Fibroids become more common as women age, especially during the 30s and 40s through menopause. After menopause, fibroids usually shrink.</li>
        <li><b>Family history.</b> Having a family member with fibroids increases your risk. If a woman's mother had fibroids, her risk of having them is about three times higher than average.</li>
        <li><b>Obesity.</b> Women who are overweight are at higher risk for fibroids. For very heavy women, the risk is two to three times greater than average.</li>
        <li><b>Eating habits.</b> Eating a lot of red meat (e.g., beef) and ham is linked with a higher risk of fibroids. Eating plenty of green vegetables seems to protect women from developing fibroids.</li>
        <li>Because no one knows for sure what causes fibroids, we also don't know what causes them to grow or shrink. We do know that they are under hormonal control — both estrogen and progesterone. They grow rapidly during pregnancy, when hormone levels are high. They shrink when anti-hormone medication is used. They also stop growing or shrink once a woman reaches menopause.</li>
        </ol><b>Symptoms:-</b> Most fibroids do not cause any symptoms, but some women with fibroids can have:
        <ol>
        <li>Heavy bleeding (which can be heavy enough to cause anemia ) or painful periods</li>
        <li>Feeling of fullness in the pelvic area (lower stomach area)</li>
        <li>Enlargement of the lower abdomen</li>
        <li>Frequent urination</li>
        <li>Pain during sex</li>
        <li>Lower back pain</li>
        <li>Complications during pregnancy and labor, including a six-time greater risk of caesarean section</li>
        <li>Reproductive problems, such as infertility, which is very rare</li>
        </ol>`;
      break;
    case 'med_uterine_polyp':
      title = 'Uterine Polyps';
      htmlContent = `Uterine polyps are overgrowth of cells in the lining of the uterus. Uterine polyps are also called as “Endometrial Polyps” Usually uterine polyps are non-cancerous growth. Uterine polyps are common in women’s during or after menopausal phase.<br><br><b>Causes :-</b> The exact causes for Uterine polyps are unknown, whereas as research says hormonal factors (Estrogen) may  play a role.<br><br><b>Symptoms:-</b><br>
        <ol>
        <li>Abnormal menstruation-Heavy menstruation/irregular menstruation</li>
        <li>Bleeding after Menopause</li>
        <li>Subfertility</li>
        </ol>`;
      break;
    case 'med_infertility':
      title = 'Infertility';
      htmlContent = `Infertility means not being able to get pregnant after one year of trying (or six months if a woman is 35 or older). Women who can get pregnant but are unable to stay pregnant may also be infertile.<br><br>Pregnancy is the result of a process that has many steps. To get pregnant:
        <ol>
        <li>A woman's body must release an egg from one of her ovaries (ovulation).</li>
        <li>The egg must go through a fallopian tube toward the uterus (womb).</li>
        <li>A man's sperm must join with (fertilize) the egg along the way.</li>
        <li>The fertilized egg must attach to the inside of the uterus (implantation).</li>
        </ol>
        <b>Causes:-</b> Most cases of female infertility are caused by problems with ovulation. Without ovulation, there are no eggs to be fertilized. Some signs that a woman is not ovulating normally include irregular or absent menstrual periods. PCOS is the most common cause of female infertility. Primary ovarian insufficiency (POI) is another cause of ovulation problems. POI occurs when a woman's ovaries stop working normally before she is 40. POI is not the same as early menopause. Less common causes of fertility problems in women include:
        <ol>
        <li>Blocked fallopian tubes due to pelvic inflammatory disease, endometriosis, or surgery for an ectopic pregnancy</li>
        <li>Physical problems with the uterus</li>
        <li>Uterine fibroids, which are non-cancerous clumps of tissue and muscle on the walls of the uterus.</li>
        <li>Many things can change a woman's ability to have a baby. These include:</li>
        <ul>
        <li>Age</li>
        <li>Smoking</li>
        <li>Excess alcohol use</li>
        <li>Stress</li>
        <li>Poor diet</li>
        <li>Athletic training</li>
        <li>Being overweight or underweight</li>
        <li>Sexually transmitted infections (STIs)</li>
        <li>Health problems that cause hormonal changes, such as polycystic ovarian syndrome and primary ovarian insufficiency</li>
        </ul>
        </ol><b>How long should women try to get pregnant before calling their doctors :-</b> Most experts suggest at least one year. Women 35 or older should see their doctors after six months of trying. A woman's chances of having a baby decrease rapidly every year after the age of 30. Some health problems also increase the risk of infertility. So, women should talk to their doctors if they have:
        <ol>
        <li>Irregular periods or no menstrual periods</li>
        <li>Very painful periods</li>
        <li>Endometriosis</li>
        <li>Pelvic inflammatory disease</li>
        <li>More than one miscarriage</li>
        </ol>It is a good idea for any woman to talk to a doctor before trying to get pregnant. Doctors can help you get your body ready for a healthy baby. They can also answer questions on fertility and give tips on conceiving.`;
      break;
    case 'med_uti':
      title = 'Urinary tract infection (UTI)';
      htmlContent = `UTI is an infection in any part of your urinary system — your kidneys, ureters, bladder and urethra. Most infections involve the lower urinary tract — the bladder and the urethra.<br><br>Women get UTIs more often because a woman's urethra (the tube from the bladder to where the urine comes out of the body) is shorter than a man's. This makes it easier for bacteria to get into the bladder. A woman's urethral opening is also closer to both the vagina and the anus, the main source of germs such as Escherichia coli (E. coli) that cause UTIs. You can take steps to help prevent a UTI
      <ol>
      <li>Urinate when you need to. Don't go without urinating for longer than three or four hours. The longer urine stays in the bladder, the more time bacteria have to grow.</li>
      <li>Try to urinate before and after sex.</li>
      <li>Always wipe from front to back.</li>
      <li>Try to drink six to eight glasses of fluid per day.</li>
      <li>Clean the anus and the outer lips of your genitals each day.</li>
      <li>Do not douche or use feminine hygiene sprays.</li>
      <li>If you get a lot of UTIs and use creams that kill sperm (spermicides), talk to your doctor or nurse about using a different form of birth control instead.</li>
      <li>Wear underpants with a cotton crotch. Avoid tight-fitting pants, which trap moisture, and change out of wet bathing suits and workout clothes quickly.</li>
      <li>Take showers, or limit baths to 30 minutes or less.</li>
      </ol><b>Causes:-</b> UTIs are caused by bacteria or, rarely, yeast getting into your urinary tract. Once there, they multiply and cause inflammation (swelling) and pain. You can help prevent UTIs by wiping from front to back after using the bathroom. Factors that increases the risk of UTIs are:
      <ol>
      <li>Are sexually active. Sexual activity can move germs that cause UTIs from other areas, such as the vagina, to the urethra.</li>
      <li>Use a diaphragm for birth control or use spermicides (creams that kill sperm) with a diaphragm or with condoms. Spermicides can kill good bacteria that protect you from UTIs.</li>
      <li>Are pregnant. Pregnancy hormones can change the bacteria in the urinary tract, making UTIs more likely. Also, many pregnant women have trouble completely emptying the bladder, because the uterus (womb) with the developing baby sits on top of the bladder during pregnancy. Leftover urine with bacteria in it can cause a UTI.</li>
      <li>Have gone through menopause. After menopause, loss of the hormone estrogen causes vaginal tissue to become thin and dry. This can make it easier for harmful bacteria to grow and cause a UTI.</li>
      <li>Have diabetes, which can lower your immune (defense) system and cause nerve damage that makes it hard to completely empty your bladder</li>
      <li>Have any condition, like a kidney stone, that may block the flow of urine between your kidneys and bladder</li>
      <li>Have or recently had a catheter in place. A catheter is a thin tube put through the urethra into the bladder. Catheters drain urine when you cannot pass urine on your own, such as during surgery.</li>
      </ol><b>Symptoms:-</b>
      <ol>
      <li>Pain or burning when urinating</li>
      <li>An urge to urinate often, but not much comes out when you go</li>
      <li>Pressure in your lower abdomen</li>
      <li>Urine that smells bad or looks milky or cloudy</li>
      <li>Blood in the urine. This is more common in younger women. If you see blood in your urine, tell a doctor or nurse right away.</li>
      <li>Feeling tired, shaky, confused, or weak. This is more common in older women.</li>
      <li>Having a fever, which may mean the infection has reached your kidneys</li>
      </ol>`;
      break;
    case 'med_vaginitis':
      title = 'Recurrent Vaginitis';
      htmlContent = `Vaginitis is an inflammation of the vagina. It normally results from an infection. The patient typically has a discharge, itching, burning, and possibly pain.<br><br><b>Causes:-</b> Vaginal infections can be caused by bacteria, fungi, parasites or viruses growing in and around your vulva and vagina.<br><br><b>Symptoms:-</b>
        <ol>
        <li>Irritation of the genital area</li>
        <li>Discharge that may be white, gray, watery, or foamy</li>
        <li>Inflammation, leading to redness and swelling of the labia majora, labia minora, and perineal area, mainly due to an excess of immune cells</li>
        <li>Dysuria, which is pain or discomfort when urinating</li>
        <li>Painful sexual intercourse, known as dyspareunia</li>
        <li>Foul or fishy vaginal odor</li>
        </ol>`;
      break;
    case 'med_hpv':
      title = 'Human Papillomavirus (HPV)';
      htmlContent = `HPV is an infection due to genital human papillomavirus which causes warts in various parts of the body specially on the genitals or surrounding skin. HPV is the most common sexually transmitted infection (STI).Sometime HPV infection does not develop any symptoms but can still infect others through sexual contact.<br><br><b>Causes:-</b> You can get HPV by having vaginal, anal, or oral sex with someone who has the virus. It is most commonly spread during vaginal or anal sex. HPV can be passed even when an infected person has no signs or symptoms. Anyone who is sexually active can get HPV, even if you have had sex with only one person.<br><br><b>Symptoms:-</b> Many people with HPV don't develop any symptoms but can still infect others through sexual contact. Symptoms may include warts on the genitals or surrounding skin.`;
      break;
    case 'med_dilation_curettage':
      title = 'Dilation & Curettage (D & C)';
      htmlContent = `A dilation and curettage, also called a D & C or D and C, is a minor surgery that involves dilating or opening the cervix. The cervix is the opening to your uterus or womb. After dilating your cervix, your doctor uses a spoon-shaped object called a curette to remove tissue from the inner lining of your uterus.<br><br><b>Why is a D & C used:-</b>
        <ol>
        <li>to determine the reason for heavy bleeding during or between your menstrual periods</li>
        <li>o remove noncancerous tumors, or fibroids</li>
        <li>to remove and examine potentially cancerous tumors</li>
        <li>to remove infected tissue, which is often caused by a sexually transmitted disease called pelvic inflammatory disease (PID)</li>
        <li>to remove tissue left behind in the womb after miscarriage or childbirth</li>
        <li>to perform an elective abortion</li>
        <li>to remove an intrauterine device (IUD), which is a form of birth control</li>
        </ol>`;
      break;
    case 'med_cancer_cervical':
      title = 'Cervical Cancer';
      htmlContent = `This is a type of cancer that forms in tissues of the cervix (Lower part of the uterus that connects to the Vagina). Cervical Cancer is also Known as malignant tumor of the cervix. It is usually a slow growing cancer that may not have symptoms but can be found with regular PAP tests (PAP test is the procedure in which cells are scraped from the cervix and screened under microscope)<br><br><b>Causes:-</b>  Human papillomavirus(HPV) a sexually transmitted infection  play a role in causing most cervical cancer. Cervical cancer may occur most often in women over age 30.<br><b>Risk Factors for Cervical Cancer:-</b>
        <ol>
        <li>Having HIV (the virus that causes AIDS) or another condition that makes it hard for your body to fight off health problems.</li>
        <li>Smoking.</li>
        <li>Using birth control pills for a long time (five or more years).</li>
        <li>Having given birth to three or more children.</li>
        <li>Having several sexual partners.</li>
        </ol><b>Symptoms:-</b> In some cases there may be no symptoms.
        <ol>
        <li>Blood spots or light bleeding between or following periods.</li>
        <li>Menstrual bleeding that is longer and heavier than usual.</li>
        <li>Bleeding after intercourse, douching, or a pelvic examination.</li>
        <li>Increased vaginal discharge.</li>
        <li>Pain during sexual intercourse.</li>
        <li>Bleeding after menopause.</li>
        <li>Unexplained, persistent pelvic and/or back pain.</li>
        </ol>`;
      break;
    case 'med_cancer_ovarian':
      title = 'Ovarian Cancer';
      htmlContent = `Cancer that begins in the female organs that produce eggs (ovaries). Most ovarian cancers are either ovarian epithelial cancers (cancer that begins in the cells on the surface of the ovary) or malignant germ cell tumors (cancer that begins in egg cells). Ovarian cancer often goes undetected until it has spread within the pelvis and stomach.<br><br><b>Causes:-</b> There are no exact known cause, few women’s get it without being at high risk.The risk factor involves for Ovarian Cancer are:
        <ol>
        <li>Are middle-aged or older.</li>
        <li>Have close family members (such as your mother, sister, aunt, or grandmother) on either your mother’s or your father’s side, who have had ovarian cancer.</li>
        <li>Have a genetic mutation (abnormality) called BRCA1 or BRCA2, or one associated with Lynch syndrome.</li>
        <li>Have had breast, uterine, or colorectal (colon) cancer.</li>
        <li>Have endometriosis.</li>
        <li>Have never given birth or have had trouble getting pregnant.</li>
        <li>Some studies suggest that women who take estrogen by itself (without progesterone) for 10 or more years may have an increased risk of ovarian cancer.</li>
        </ol><b>Symptoms:-</b> Ovarian cancer often has no symptoms in the early stages. Later stages are associated with symptoms, but they can be non-specific. Common symptoms may include:
        <ol>
        <li>Abdominal bloating, indigestion or nausea</li>
        <li>Changes in appetite, such as a loss of appetite or feeling full sooner</li>
        <li>Pressure in the pelvis or lower back</li>
        <li>A more frequent or urgent need to urinate and/or constipation</li>
        <li>Changes in bowel movements</li>
        <li>Increased abdominal girth</li>
        <li>Tiredness or low energy</li>
        <li>Changes in menstruation</li>
        </ol>`;
      break;
    case 'med_cancer_uterine':
      title = 'Uterine Cancer';
      htmlContent = `Cancer that forms in tissues of the uterus (pear-shaped organ in a woman's pelvis in which a fetus develops). Two types of uterine cancer are:
        <ol>
        <li>Endometrial cancer (cancer that begins in the layer of cells that form the lining of uterus)</li>
        <li>Uterine sarcoma (a rare cancer that begins in muscle or other tissues in the uterus).</li>
        </ol><b>Causes:-</b> The causes for uterine cancer is unknown, whereas number of risk factors which contributes are :
        <ol>
        <li>Age-Older then 50</li>
        <li>Estrogens levels after the menopause.</li>
        <li>Being overweight or obese- an abnormally high, unhealthy amount of body fat</li>
        <li>Reproductive history-Women who have never had children</li>
        <li>If taking Tamoxifen</li>
        <li>High levels of insulin.</li>
        <li>Polycystic ovary syndrome (PCOS)</li>
        <li>Endometrial hyperplasia.</li>
        <li>Family history</li>
        </ol><b>Symptoms:-</b> Symptoms include
        <ol>
        <li>Premenopausal Vaginal bleeding, spotting, or discharge. this includes menorrhagia, which is an abnormally heavy or prolonged bleeding, and/or abnormal uterine bleeding (AUB).</li>
        <li>Postmenopausal Vaginal bleeding</li>
        <li>Abnormal results from a Pap test (see Diagnosis)</li>
        <li>Pain in the pelvic area.</li>
        </ol>`;
      break;
    case 'med_anemia':
      title = 'Anemia';
      htmlContent = `Iron-deficiency anemia is the most common type of anemia, a condition that happens when your body does not make enough healthy red blood cells or the blood cells do not work correctly.<br>Iron-deficiency anemia happens when you don’t have enough iron in your body. Your body needs iron to make hemoglobin, the part of the red blood cell that carries oxygen through your blood to all parts of your body.<br><br><b>Causes:-</b> Women can have low iron levels for several reasons:
      <ol>
      <li>Iron lost through bleeding. Bleeding can cause you to lose more blood cells and iron than your body can replace. Women may have low iron levels from bleeding caused by:</li>
      <li>Digestive system problems, such as ulcers, colon polyps, or colon cancer</li>
      <li>Regular, long-term use of aspirin and other over-the-counter pain relievers</li>
      <li>Donating blood too often or without enough time in between donations for your body to recover</li>
      <li>Heavier or longer than normal menstrual periods</li>
      <li>Uterine fibroids, which are noncancerous growths in the uterus that can cause heavy bleeding</li>
      <li>Increased need for iron during pregnancy. During pregnancy, your body needs more iron than normal to support your developing baby.</li>
      <li>Not eating enough food that contains iron. Your body absorbs the iron in animal-based foods, such as meat, chicken, and fish, two to three times better than the iron in plant-based foods. Vegetarians or vegans, who eat little or no animal-based foods, need to choose other good sources of iron to make sure they get enough. Your body also absorbs iron from plant-based foods better when you eat them with foods that have vitamin C, such as oranges and tomatoes. But most people in the United States get enough iron from food.</li>
      <li>Problems absorbing iron. Certain health conditions, such as Crohn's disease or celiac disease, or gastric bypass surgery for weight loss can make it harder for your body to absorb iron from food.</li>
      </ol><b>Symptoms :-</b> Iron-deficiency anemia often develops slowly. In the beginning, you may not have any symptoms, or they may be mild. As it gets worse, you may notice one or more of these symptoms:
      <ol>
      <li>Fatigue (very common)</li>
      <li>Weakness (very common)</li>
      <li>Dizziness</li>
      <li>Headaches</li>
      <li>Low body temperature</li>
      <li>Pale or yellow "sallow" skin</li>
      <li>Rapid or irregular heartbeat</li>
      <li>Shortness of breath or chest pain, especially with physical activity</li>
      <li>Brittle nails</li>
      <li>Pica (unusual cravings for ice, very cold drinks, or non-food items like dirt or paper)</li>
      <li>If you think you may have iron-deficiency anemia, talk to your doctor or nurse.</li>
      </ol>`;
      break;
    case 'med_high_blood_pressure':
      title = 'High Blood Pressure';
      htmlContent = `High blood pressure, also called Hypertension, is a significant risk factor for heart disease and stroke. Blood pressure is the force your blood makes against your artery walls when your heart beats. If this force is too high, it can damage your arteries. Develop Healthy Heart Habits to Lower Blood Pressure, Here are some steps you can take:
        <ol>
        <li>Eat a Healthy Diet</li>
        <li>Maintain a Healthy Weight</li>
        <li>Be Physically Active</li>
        <li>Stop Smoking</li>
        <li>Limit Alcohol Consumption</li>
        <li>Get Enough Sleep</li>
        </ol><b>Causes:-</b> You are more likely to have high blood pressure if you have a family history of high blood pressure. Other risk factors include diet, lack of exercise, and obesity.<br><br><b>Symptoms:-</b> High blood pressure usually shows no symptoms. Regularly checking and monitoring your blood pressure helps you know when it is elevated and what impacts your blood pressure.  Measure your blood pressure to find out your numbers:
        <ol>
        <li><b>Systolic</b> (the top number) is the pressure as your heart beats or pumps blood into your arteries.</li>
        <li><b>Diastolic</b> (the bottom number) is the pressure when your heart is at rest.</li>
        </ol>To lower your risk of heart disease and stroke, try to maintain your blood pressure at less than 120 systolic/80 diastolic.`;
      break;
    case 'med_diabetes':
      title = 'Diabetes';
      htmlContent = `Diabetes is a disease caused by high levels of blood sugar (glucose) in your body. This can happen when your body does not make insulin or does not use insulin correctly. Insulin is a hormone made in the pancreas, an organ near your stomach. Insulin helps the glucose from food get into your body's cells for energy. If your body does not make enough insulin, or your body does not use the insulin correctly, the glucose stays and builds up in your blood.<br><br>Over time, this extra glucose can lead to prediabetes or diabetes. Diabetes puts you at risk for other serious and life-threatening health problems, such as heart disease, stroke, blindness, and kidney damage. The three main types of diabetes are:
        <ol>
        <li><b>Type 1 diabetes.</b> Type 1 diabetes is an autoimmune disease, meaning the body's immune (defense) system attacks and destroys the cells in the pancreas that make insulin. If you have type 1 diabetes, your body does not make insulin, so you must take insulin every day.</li>
        <li><b>Type 2 diabetes.</b> This is the most common type of diabetes. You can get type 2 diabetes at any age, even during childhood. With type 2 diabetes, your body does not make enough insulin or is not able to use its own insulin correctly. When this happens, blood glucose levels rise.</li>
        <li><b>Gestational diabetes.</b> Gestational diabetes is a type of diabetes that happens only during pregnancy. Gestational diabetes can cause health problems for the baby and the mother if not controlled. Although gestational diabetes goes away after your baby is born, having diabetes during pregnancy raises your risk for type 2 diabetes later on.</li>
        </ol><b>Causes:-</b> Exact causes of type 1 and type 2 diabetes is not known. It is found that inheriting certain genes from your family can raise your risk for developing diabetes. Obesity is also a major risk factor for type 2 diabetes. Smoking can also cause type 2 diabetes. And the more you smoke the higher your risk for type 2 diabetes and other serious health problems if you already have diabetes. But, obesity and smoking do not always cause diabetes. Some women who are overweight or obese or smoke never develop diabetes. Also, women who are a normal weight or only slightly overweight can develop diabetes if they have other risk factors, such as a family history of diabetes.<br><br><b>Symptoms:-</b>
        <ol>
        <li><b>Type 1 diabetes</b> symptoms are usually more severe and may develop suddenly.</li>
        <li><b>Type 2 diabetes</b> may not cause any signs or symptoms at first. Symptoms can develop slowly over time. You may not notice them right away.</li>
        <li>Common signs and symptoms of type 1 and type 2 diabetes include:</li>
        <ul>
        <li>Feeling more tired than usual</li>
        <li>Extreme thirst</li>
        <li>Urinating more than usual</li>
        <li>Blurry vision</li>
        <li>Feeling hungrier than usual</li>
        <li>Losing weight without trying</li>
        <li>Sores that are slow to heal</li>
        <li>Dry, itchy skin</li>
        <li>Tingling in the hands or feet</li>
        <li>More infections, such as urinary tract infections and vaginal yeast infections, than usual</li>
        </ul>
        </ol>`;
      break;
    case 'med_hyperthyroidism':
      title = 'Hyperthyroidism';
      htmlContent = `Hyperthyroidism, or overactive thyroid, causes your thyroid to make more thyroid hormone than your body needs. This speeds up many of your body's functions, like your metabolism and heart rate.<br><br><b>Causes:-</b> The most common cause of hyperthyroidism is Graves' disease. Graves' disease is a problem with the immune system.<br><br><b>Symptoms:-</b> Symptoms usually begin slowly. But, over time, a faster metabolism can cause symptoms such as:
         <ol>
         <li>Weight loss, even if you eat the same or more food (most but not all people lose weight)</li>
         <li>Eating more than usual</li>
         <li>Rapid or irregular heartbeat or pounding of your heart</li>
         <li>Feeling nervous or anxious</li>
         <li>Feeling irritable</li>
         <li>Trouble sleeping</li>
         <li>Trembling in your hands and fingers</li>
         <li>Increased sweating</li>
         <li>Feeling hot when other people do not</li>
         <li>Muscle weakness</li>
         <li>Diarrhea or more bowel movements than normal</li>
         <li>Fewer and lighter menstrual periods than normal</li>
         <li>Changes in your eyes that can include bulging of the eyes, redness, or irritation</li>
         <li>Hyperthyroidism raises your risk for osteoporosis, a condition that causes weak bones that break easily. In fact, hyperthyroidism might affect your bones before you have any of the other symptoms of the condition. This is especially true of women who have gone through menopause or who are already at high risk of osteoporosis.</li>
         </ol>`;
      break;
    case 'med_hypothyroidism':
      title = 'Hypothyroidism';
      htmlContent = `Hypothyroidism is when your thyroid does not make enough thyroid hormones. It is also called underactive thyroid. This slows down many of your body's functions, like your metabolism.<br></br><b>Causes:-</b> The most common cause of hypothyroidism is Hashimoto's disease. In people with Hashimoto's disease, the immune system mistakenly attacks the thyroid. This attack damages the thyroid so that it does not make enough hormones. Hypothyroidism also can be caused by:
        <ol>
        <li>Hyperthyroidism treatment (radioiodine)</li>
        <li>Radiation treatment of certain cancers</li>
        <li>Thyroid removal</li>
        </ol><b>Symptoms:-</b> Symptoms of hypothyroidism develop slowly, often over several years. At first, you may feel tired and sluggish. Later, you may develop other signs and symptoms of a slowed-down metabolism, including:
        <ol>
        <li>Feeling cold when other people do not</li>
        <li>Constipation</li>
        <li>Muscle weakness</li>
        <li>Weight gain, even though you are not eating more food</li>
        <li>Joint or muscle pain</li>
        <li>Feeling sad or depressed</li>
        <li>Feeling very tired</li>
        <li>Pale, dry skin</li>
        <li>Dry, thinning hair</li>
        <li>Slow heart rate</li>
        <li>Less sweating than usual</li>
        <li>A puffy face</li>
        <li>A hoarse voice</li>
        <li>More than usual menstrual bleeding</li>
        <li>You also may have high LDL or "bad" cholesterol, which can raise your risk for heart disease.</li>
        </ol>`;
      break;
    case 'med_depression':
      title = 'Depression';
      htmlContent = `Depression is a mental health illness when someone feels sad (including crying often), empty, or hopeless most of the time (or loses interest in or takes no pleasure in daily activities) for at least 2 weeks. Depression affects a person’s ability to work, go to school, or have relationships with friends and family. Depression is one of the most common mental health conditions. It is an illness that involves the body, mood, and thoughts. It can affect the way you eat and sleep, the way you feel about yourself, and the way you think about things. Women are twice as likely as men to be diagnosed with depression.<br>It is different from feeling "blue" or "down" or just sad for a few hours or a couple of days. Depression is also different from grief over losing a loved one or experiencing sadness after a trauma or difficult event. It is not a condition that can be willed or wished away. People who have depression cannot just “pull themselves” out of it. Type of depression are :<ol><li><b>Major depressive disorder:</b> Also called major depression, this is a combination of symptoms that affects a person’s ability to sleep, work, study, eat, and enjoy hobbies and everyday activities.</li><li><b>Dysthymic disorder:</b> Also called dysthymia, this kind of depression lasts for 2 years or more. The symptoms are less severe than those of major depression but can prevent you from living normally or feeling well.</li><li>Other types of depression have slightly different symptoms and may start after a certain event. These types of depression include:</li><ul><li><b>Psychotic depression,</b> when a severe depressive illness happens with some form of psychosis, such as a break with reality, hallucinations, and delusions</li><li><b>Postpartum depression,</b> which is diagnosed if a new mother has a major depressive episode after delivery. Depression can also begin during pregnancy, called prenatal depression.</li><li><b>Bipolar depression,</b> which is the depressive phase of bipolar illness and requires different treatment than major depression</li></ul></ol><b>Causes :-</b> There is no single cause of depression. Also, different types of depression may have different causes. There are many reasons why a woman may have depression:<ol><li><b>Family history.</b> Women with a family history of depression may be more at risk. But depression can also happen in women who don’t have a family history of depression.</li><li><b>Brain changes.</b> The brains of people with depression look and function differently from those of people who don’t have depression.</li><li><b>Chemistry.</b> In someone who has depression, parts of the brain that manage mood, thoughts, sleep, appetite, and behavior may not have the right balance of chemicals.</li><li><b>Hormone levels.</b> Changes in the female hormones estrogen and progesterone during the menstrual cycle, pregnancy, postpartum period, perimenopause, or menopause may all raise a woman’s risk for depression. Having a miscarriage can also put a woman at higher risk for depression.</li><li><b>Stress.</b> Serious and stressful life events, or the combination of several stressful events, such as trauma, loss of a loved one, a bad relationship, work responsibilities, caring for children and aging parents, abuse, and poverty, may trigger depression in some people.</li><li><b>Medical problems.</b> Dealing with a serious health problem, such as stroke, heart attack, or cancer, can lead to depression. Research shows that people who have a serious illness and depression are more likely to have more serious types of both conditions. Some medical illnesses, like Parkinson’s disease, hypothyroidism, and stroke, can cause changes in the brain that can trigger depression.</li><li><b>Pain.</b> Women who feel emotional or physical pain for long periods are much more likely to develop depression. The pain can come from a chronic (long-term) health problem, accident, or trauma such as sexual assault or abuse.</li></ol><b>Symptoms:-</b> Not all people with depression have the same symptoms. Some people might have only a few symptoms, while others may have many. How often symptoms happen, how long they last, and how severe they are may be different for each person.<br><br>If you have any of the following symptoms for at least 2 weeks, talk to a doctor or nurse or mental health professional:<ol><li>Feeling sad, “down,” or empty, including crying often</li><li>Feeling hopeless, helpless, worthless, or useless</li><li>Loss of interest in hobbies and activities that you once enjoyed</li><li>Decreased energy</li><li>Difficulty staying focused, remembering, or making decisions</li><li>Sleeplessness, early morning awakening, or oversleeping and not wanting to get up</li><li>Lack of appetite, leading to weight loss, or eating to feel better, leading to weight gain</li><li>Thoughts of hurting yourself</li><li>Thoughts of death or suicide</li><li>Feeling easily annoyed, bothered, or angered</li><li>Constant physical symptoms that do not get better with treatment, such as headaches, upset stomach, and pain that doesn’t go away</li></ol>`;
      break;
    case 'med_migraine':
      title = 'Migraine';
      htmlContent = `Migraine is a medical condition. Most people who suffer from migraines get headaches that can be quite severe. A migraine headache is usually an intense, throbbing pain on one, or sometimes, both sides of the head. Most people with migraine headache feel the pain in the temples or behind one eye or ear, although any part of the head can be involved. Besides pain, migraine also can cause nausea and vomiting and sensitivity to light and sound. Some people also may see spots or flashing lights or have a temporary loss of vision.<br><br>Migraine can occur any time of the day, though it often starts in the morning. The pain can last a few hours or up to one or two days. Some people get migraines once or twice a week. Others, only once or twice a year. Most of the time, migraines are not a threat to your overall health. But migraine attacks can interfere with your day-to-day life.<br><br><b>Causes:-</b> The exact cause of migraine is not fully understood. Most researchers think that migraine is due to abnormal changes in levels of substances that are naturally produced in the brain. When the levels of these substances increase, they can cause inflammation. This inflammation then causes blood vessels in the brain to swell and press on nearby nerves, causing pain.Genes also have been linked to migraine. People who get migraines may have abnormal genes that control the functions of certain brain cells.<br><br>Experts do know that people with migraines react to a variety of factors and events, called triggers. These triggers can vary from person to person and don't always lead to migraine. A combination of triggers — not a single thing or event — is more likely to set off an attack. A person's response to triggers also can vary from migraine to migraine. Many women with migraine tend to have attacks triggered by:
        <ol>
        <li>Lack of or too much sleep</li>
        <li>Skipped meals</li>
        <li>Bright lights, loud noises, or strong odors</li>
        <li>Hormone changes during the menstrual cycle</li>
        <li>Stress and anxiety, or relaxation after stress</li>
        <li>Weather changes</li>
        <li>Alcohol (often red wine)</li>
        <li>Caffeine (too much or withdrawal)</li>
        <li>Foods that contain nitrates, such as lunch meats</li>
        <li>Foods that contain MSG (monosodium glutamate), a flavor enhancer found in fast foods, seasonings, and spices</li>
        <li>Foods that contain tyramine, such as aged cheeses, soy products, fava beans, hard sausages, smoked fish, and Chianti wine</li>
        <li>To pinpoint your migraine triggers, keep a headache diary. Each day you have a migraine headache, put that in your diary. Also write down the:</li>
        <ul>
        <li>The time of day your headache started</li>
        <li>Where you were and what you were doing when the migraine started</li>
        <li>What you ate or drank 24 hours before the attack</li>
        <li>Each day you have your period, not just the first day (This can allow you and your doctor to see if your headaches occur at the same or similar time as your period.)</li>
        </ul>    
        </ol>Talk with your doctor about what sets off your headaches to help find the right treatment for you.`;
      break;
    case 'med_eating_disorder':
      title = 'Eating Disorder';
      htmlContent = `Eating disorders are illnesses in which the people experience severe disturbances in their eating behaviors and related thoughts and emotions. People with eating disorders might start with an obsession with food, body weight, or body shape. In severe cases, eating disorders can cause serious health consequences.<br><br><b>Causes:-</b> The exact cause of eating disorders is unknown, the combination of biological, psychological, and/or environmental abnormalities may contribute to the development of these illnesses.
        <ol>
        <li>Biological factors include:
        <ul>
        <li>Irregular hormone functions</li>
        <li>Genetics (the tie between eating disorders and one’s genes is still being heavily researched, but we know that genetics is a part of the story).</li>
        <li>Nutritional deficiencies</li>
        </ul>
        </li>
        <li>Psychological factors include:
        <ul>
        <li>Negative body image</li>
        <li>Poor self-esteem</li>
        </ul>
        </li>
        <li>Environmental factors that would contribute to the occurrence of eating disorders are:
        <ul>
        <li>Dysfunctional family dynamic</li>
        <li>Professions and careers that promote being thin and weight loss, such as ballet and modeling</li>
        <li>Aesthetically oriented sports, where an emphasis is placed on maintaining a lean body for enhanced performance.</li>
        <li>Examples include:</li>
        <li>Rowing</li>
        <li>Diving</li>
        <li>Ballet</li>
        <li>Gymnastics</li>
        <li>Wrestling</li>
        <li>Long distance running</li>
        <li>Family and childhood traumas: childhood sexual abuse, severe trauma</li>
        <li>Cultural and/or peer pressure among friends and co-workers</li>
        <li>Stressful transitions or life changes</li>
        </ul>
        </li>
        </ol><b>Symptoms:-</b> Eating disorder may reveal several signs and symptoms, some which are:<br><br>
        <ol>
        <li>Chronic dieting despite being hazardously underweight</li>
        <li>Constant weight fluctuations</li>
        <li>Obsession with calories and fat contents of food</li>
        <li>Engaging in ritualistic eating patterns, such as cutting food into tiny pieces, eating alone, and/or hiding food</li>
        <li>Depression or lethargic stage</li>
        <li>Avoidance of social functions, family, and friends. May become isolated and withdrawn</li>
        <li>Switching between periods of overeating and fasting</li>
        </ol>`;
      break;
    case 'med_bleeding_disorder':
      title = 'Bleeding/clotting Disorder';
      htmlContent = `A bleeding disorder is a condition that affects the way your blood normally clot The clotting process also known as coagulation, that changes blood from a liquid to a solid.<br>Bleeding disorders often develop when the blood can’t clot properly. For blood to clot, your body needs blood proteins called clotting factors and blood cells called platelets. Normally, platelets clump together to form a plug at the site of a damaged or injured blood vessel.<br><br>The clotting factors then come together to form a fibrin clot. This keeps the platelets in place and prevents blood from flowing out of the blood vessel.<br><br><b>Causes:</b> In people with bleeding disorders, however, the clotting factors or platelets don’t work the way they should or are in short supply. When the blood doesn’t clot, excessive or prolonged bleeding can occur. It can also lead to spontaneous or sudden bleeding in the muscles, joints, or other parts of the body<br><br>The majority of bleeding disorders are inherited. However, some disorders may develop as a result of other medical conditions, such as liver disease.
         <ol>
           <li>Bleeding disorders may also be caused by:
           <ul>
           <li>a low red blood cell count</li>
           <li>a vitamin K deficiency</li>
           </ul>
           </li>  
           <li>Side effects from certain medications</li>
           <li>Medications that can interfere with the clotting of the blood are called anticoagulants.</li>
         </ol><b>Symptoms:</b>
         <ol>
         <li>Heavy bleeding during menstruation (period) that can include
         <ul>
         <li>Bleeding that lasts longer than 7 days from the time bleeding starts until the time it ends;</li>
         <li>Flooding or gushing of blood that limits daily activities, such as work, school, exercise, or social activities;</li>
         <li>Passing clots that are bigger than a grape; and</li>
         <li>Soaking a tampon or pad every hour or more often on the heaviest day(s).</li>
         <li>A diagnosis of “low in iron” or having received treatment for anemia.</li>
         </ul>
         </li>
         <li>Symptoms of easy or frequent bleeding that can include
         <ul>
         <li>Nosebleeds that occur for no apparent reason and last longer than 10 minutes or that need medical attention</li>
         <li>Easy bruising that occurs with no physical injury;</li>
         <li>Excessive bleeding after a medical procedure or dental extraction; and</li>
         <li>A history of muscle or joint bleeding with no physical injury.</li>
         </ul>
         </li>
         <li>Having one or more of the bleeding symptoms above and a family member with a bleeding disorder, such as von Willebrand disease or hemophilia.</li>
         </ol>`;
      break;
    case 'hlog_lifestyle':
      title = 'Lifestyle';
      htmlContent = `Lifestyle is the way that a person lives. According to WHO, 60% of related factors to individual health and quality of life are correlated to lifestyle. By checking and monitoring key health metrics like Weight, Blood pressure, Blood sugar, etc. you can make effective changes to your lifestyle and health<br><br><b>i) Weight:</b> A healthy weight, means that your Body Mass Index (BMI) falls within a weight range that is not associated with an increased risk for weight-related diseases and health issues. Body Mass Index is determined by your height and your weight.<br></br>According to the National Institutes of Health (NIH):
              <ul>
              <li>A BMI of less than 18.5 means that a person is underweight.</li>
              <li>A BMI of between 18.5 and 24.9 is ideal</li>
              <li>A BMI of between 25 and 29.9 is overweight.</li>
              <li>A BMI over 30 indicates obesity.</li>
              </ul>Having excess weight can affect a person’s risk of developing a number of health conditions, including obesity, type 2 diabetes, high blood pressure, and cardiovascular problems.<br><br><b>ii) Basal Body Temperature (BBT):</b>  Basal body temperature is your temperature when you're fully at rest. It is usually estimated by a temperature measurement immediately after awakening and before any physical activity has been undertaken.<br><br>Ovulation may cause a slight increase in basal body temperature.<br></br>Before ovulation, a woman's BBT averages between 97°F (36.1°C) and 97.5°F (36.4°C). After ovulation, it rises to 97.6°F (36.4°C) to 98.6°F (37°C).<br><br>You'll be most fertile during the two to three days before your temperature rises. By tracking your basal body temperature each day, you may be able to predict when you'll ovulate<br><br><b>iii) Blood pressure:</b> Regularly checking and monitoring your blood pressure helps you know when it is elevated and what impacts your blood pressure.
              <ul>
              <li><b>Systolic (the top number)</b> is the pressure as your heart beats or pumps blood into your arteries.</li>
              <li><b>Diastolic (the bottom number)</b> is the pressure when your heart is at rest.</li>
              </ul>To lower your risk of heart disease and stroke, try to maintain your blood pressure at less than 120 systolic/80 diastolic.<br><br><b>iv) Blood Sugar:</b> Blood sugar, or glucose, is the main sugar found in your blood. It comes from the food you eat, and is your body's main source of energy. Diabetes is a disease in which your blood sugar levels are too high.<br><br>To lower your risk of Diabetes maintain your fasting blood sugar level less than 100 mg/dL (5.6 mmol/L) and 2 hours post meal less than 140 mg/dL.<br><br>Even if you don't have diabetes, sometimes you may have problems with blood sugar that is too low or too high. Keeping a regular check and monitoring can help in taking timely action.`;
      break;
    case 'hlog_bleeding':
      title = 'Bleeding';
      htmlContent = `The amount of blood lost during a menstrual period ranges from 5 to 80 milliliters (mL), that’s up to 6 tablespoon. The average amount of blood loss can be found to be 35 ml. That is about 2 – 3 tablespoons (of 14ml) or 6 teaspoons (of 5ml)<br>Your periods may be lighter, medium or heavier than the average amount.<br><br><b>Light Period:</b> Usually considered as a Blood loss of less than 20 mL in each period. A shift or imbalance in hormone levels is the main cause of light periods.<br>Soaking less than 1 pad or tampon in more than 3 hours.<br><br><b>Medium Period:</b> Usually considered as a Blood loss between 20-80 mL in each period.<br>Soaking more than 1 pad or tampon in 3 hours.<br><br><b>Heavy periods:</b> Usually considered as blood loss of 80 ml or more in each period. Heavy periods can be normal for some women but they can be inconvenient and there may be an underlying cause like hormonal imbalance, IUD use, medication side effects, etc.<br>Soaking 1 or 2 pads or tampons in 1 or 2 hours, unless that is normal for you. For most women, passing clots of blood from the vagina and soaking through their usual pads or tampons every hour for 2 or more hours is not normal and is considered severe.<br><br><b>Spotting:</b> Light vaginal bleeding between periods. Spotting can be natural or caused by a disease. Wearing a light sanitary pad is usually sufficient to catch the small amount of blood involved.<br><br><b>Colors:</b> Don’t be alarmed by different colours of blood appearing during your period, in many cases this is quite normal. During menstruation, the body sheds tissue and blood from the uterus through the vagina. This bloody discharge can vary from bright red to dark brown or black depending on how old it is.<br><br><b>Bright red blood</b> – Bright red blood is the regular blood that you will lose for the majority of your period. It means that this blood has been recently shed from the lining of your womb. A period may start with bright red bleeding and darken towards the end of the period. Some people may find that their blood stays bright red throughout their period<br><br><b>Dark brown blood</b> – don’t worry this is still blood! You will often see dark, brown looking blood nearer the end of your period. This is just older blood. Sometimes if your period is very light, or first thing in the morning, the blood may have been stored in your uterus for longer before being shed<br><br><b>Black-</b> Black blood can appear at the beginning or end of a person’s period. The color is typically a sign of old blood or blood that has taken longer to leave the uterus and has had time to oxidize, first turning brown or dark red and then eventually becoming black.<br>Black blood can sometimes also indicate a blockage inside a person’s vagina. Other symptoms of a vaginal blockage can include:
        <ul>
        <li>foul-smelling discharge</li>
        <li>fever</li>
        <li>difficulty urinating</li>
        <li>itching or swelling in or around the vagina</li>
        </ul><b>Clear – </b>your period may be red but flecked with a clear liquid, this is just vaginal discharge which is perfectly normal<br><br><b>Orange, yellow or green –</b> this might suggest fluids have leaked from elsewhere in the uterus rather than just the regular lining or you have some sort of infection. It might be worth visiting your doctor if this persists<br><br><b>Pink-</b> Pink blood or spotting can occur when period blood mixes with cervical fluid.
        Using hormonal birth control can lower estrogen levels in the body, which can lead to a lighter flow with a pinkish hue during periods.<br>Sexual intercourse can create small tears in the vagina or the cervix. Blood from these tears can mix with vaginal fluids and exit a person’s body as pink discharge.<br>Other causes of pink period blood can include:
        <ul>
         <li>significant weight loss</li>
         <li>unhealthful diet</li>
         <li>anemia</li>   
        </ul><b>Grey –</b> Grey discharge is usually a sign of bacterial vaginosis, a condition that occurs due to an imbalance between beneficial and harmful bacteria in the vagina. Other symptoms of bacterial vaginosis include:
        <ul>
        <li>itching in and around the vagina</li>
        <li>foul-smelling vaginal odor that people often describe as “fishy”</li>
        <li>burning or painful urination</li>
        </ul>During the later stages of pregnancy, grey discharge containing clots can indicate a miscarriage. A visit to your doctor is advised if this is the case.<br><br><b>Smell:</b>  A menstrual period consists of the shedding of an unfertilized egg, blood, and uterine lining tissues. It’s completely normal for this combination to have a slight odor after it exits the vagina.<br><br>Several factors can influence the smell of menstrual blood, such as the vagina’s pH and the presence of bacteria.<br><br>Your period can produce an odor, which may even be different month to month.<br><br><b>Fishy:</b> Infections, especially bacterial vaginosis, can create a fishy odor. This can happen any time, not just during menstruation. You may have bacterial vaginosis if the “fishy” smell is accompanied by:
        <ul>
        <li>burning, especially during urination</li>
        <li>irritation</li>
        <li>itchiness</li>
        <li>vaginal discharge outside of menstrual bleeding</li>
        </ul>Bacterial vaginosis produces a fishy smell, which is more pronounced during menstruation, as blood increases the vaginal alkalinity. A person might have white or gray vaginal discharge outside of menstruation. Another infection that produces a fishy smell during a person’s period is trichomoniasis, which is a sexually transmitted infection.<br></br><b>Offensive Rotten smell:</b> A person might notice a bad or rotten smell during their period, which could be a sign of a problem. This type of smell is often due to a foreign body, such as a tampon, that a person has accidentally left in the vagina for too long.<br><br><b>Metallic:</b> Period blood can have a metallic smell, like a copper coin. This is typically due to the presence of iron in the blood and is not usually a cause for concern. However, it should not persist much longer after the period ends.<br><br><b>Sweet:</b> A sweet smell in the period blood is likely due to the acidic environment and the presence of bacteria in the vagina.<br><br><b>Body odor</b><br>A person might notice a smell that is similar to body odor during their period. This is due to the presence of apocrine sweat glands in the genital region. Apocrine sweat mixes with bacteria on the skin to produce body odor. The glands release this type of sweat during periods of stress or anxiety. It is different from the sweat lost during exercise, or when the body has a high temperature.<br><br><b>Bleeding Type</b><br><br><b>Thin –</b> Thin blood is expected and this type usually appears with light to moderately heavy periods<br><br><b>Lumpy –</b>Lumpy periods are often nothing to worry about as it a common feature in slightly heavier periods. The lining of your womb which is breaking down to give you your period is quite thick, and normally as you bleed, your body releases anti-coagulant chemicals to thin this material and prevent blood clots. However, in very heavy periods your body struggles to keep up and you can end up passing these clots of blood. However, if the lumps are other colours other than red (such as pink or grey), have a solid consistency or the clumps are very frequent and associated with pain or other symptoms, be sure to pay a visit to your doctor as it could be a sign of something else such as fibroids or a miscarriage<br><br><b>Slimy –</b>Slippery or slimy blood usually suggest your period is simply mixed with some regular vaginal secretions and is also normal. Again, if this is accompanied by other colours other than red it might be worth getting checked.`;
      break;
    case 'hlog_symptom':
      title = 'Symptoms';
      htmlContent = `Changes in your body's hormone levels before and during your period can cause physical and emotional symptoms.<br><br><b>Premenstrual syndrome (PMS):</b> Is a common condition that appears up to 10 days before your period and continues into the first few days of bleeding.<br><br>Symptoms can be <b>physical</b> (headache, fatigue, bloating) or <b>emotional</b> (anxiety, irritability, insomnia) and can be relatively mild or fairly severe.<br><br>Women in their 30s are most likely to have PMS. The most severe form of PMS is <b>Premenstrual dysphoric disorder (PMDD).</b> People also suffer extreme emotional symptoms such as sadness, anxiety, or anger.<br><br>Simply <b>track your</b> complains by selecting the icons of the physical symptoms and/or emotions/mood experienced by you on a particular day. If missed you can always record at a later day using the calendar feature.<br><br>Daily recording of your complains will provide insight about your health at specific times of the month and understand trends/pattern of symptoms experienced by you. Armed with this information you can better understand your body and be prepared to tackle any monthly cycle related complains and also use this information to plan your activities.`;
      break;
    case 'hlog_emotion_mood':
      title = 'Emotion/Mood';
      htmlContent = `Changes in your body's hormone levels before and during your period can cause physical and emotional symptoms.<br><br><b>Premenstrual syndrome (PMS):</b> Is a common condition that appears up to 10 days before your period and continues into the first few days of bleeding.<br><br>Symptoms can be <b>physical</b> (headache, fatigue, bloating) or <b>emotional</b> (anxiety, irritability, insomnia) and can be relatively mild or fairly severe.<br><br>Women in their 30s are most likely to have PMS. The most severe form of PMS is <b>Premenstrual dysphoric disorder (PMDD).</b> People also suffer extreme emotional symptoms such as sadness, anxiety, or anger.<br><br>Simply <b>track your</b> complains by selecting the icons of the physical symptoms and/or emotions/mood experienced by you on a particular day. If missed you can always record at a later day using the calendar feature.<br><br>Daily recording of your complains will provide insight about your health at specific times of the month and understand trends/pattern of symptoms experienced by you. Armed with this information you can better understand your body and be prepared to tackle any monthly cycle related complains and also use this information to plan your activities.`;
      break;
    case 'hlog_hygiene':
      title = 'Hygiene';
      htmlContent = `Hygiene products refers to items or goods that a woman uses during her menstrual cycle.<br><br><b>Pads:</b> are rectangles of absorbent material that attach to the inside of a girl's underwear and catch menstrual blood. They're sometimes also called sanitary pads or sanitary napkins. Some pads have extra material on the sides. These "wings" fold over the edges of your underwear to help hold the pad in place and prevent leaking<br><br><b>Panty liner:</b> Liners are similar to pads except much thinner and smaller, these are designed for use in between your period, or when your period is light.<br><br><b>Tampon:</b> A menstrual product made of rayon or cotton (or a combination) that is inserted into the vagina. Tampons expand and catch blood before it has a chance to leave the body. They may come with an applicator or you may use your fingers to insert. Tugging on the string at the end of the tampon removes it.<br><br><b>Menstrual cup:</b> This small, flexible device made from latex or rubber is inserted into the vagina to catch menstrual blood. Blood is eventually dumped out and the device reinserted. Because it is reusable, it is considered an environmentally friendly form of feminine hygiene.`;
      break;
    case 'hlog_fluid':
      title = 'Fluid';
      htmlContent = `Vaginal discharge is fluid released by glands in the vagina and cervix. The fluid carries dead cells and bacteria out of the body, and vaginal discharge helps keep the vagina clean and prevent infection. Burris also says normal vaginal discharge varies in amount and ranges in color from clear to milky, white discharge.<br><br><b>Vaginal Discharge Color Meaning:</b><br><br><b>White/Egg- white:</b> A bit of white discharge, especially at the beginning or end of your menstrual cycle, is normal. However, if the discharge is accompanied by itching and has a thick, cottage cheese-like consistency or appearance, it’s not normal and needs treatment. This type of discharge may be a sign of a yeast infection.<br><br><b>Creamy:</b> It's completely normal. As you get closer to your period, the discharge may become thicker and more opaque. This milky white discharge may also be a sign that you're pregnant. In the early stages of pregnancy, some people produce a thin, milky white discharge.<br><br><b>Clear and watery:</b> A clear and watery discharge is perfectly normal. It can occur at any time of the month. It may be especially heavy after exercise.<br><br><b>Clear and sticky:</b> When discharge is clear but sticky and mucous-like, rather than watery, it indicates that you are likely ovulating. This is a normal type of discharge.<br><br><b>Yellow or Green Discharge:</b> Yellow discharge is abnormal discharge, as this is a sign of a bacterial infection or sexually transmitted infection such as trichomoniasis. There also may be an odor associated with it. Anyone experiencing green discharge should see her doctor.<br><br><b>Brown Discharge:</b> May happen right after periods, and is just "cleaning out" your vagina. Old blood looks brown. It may also be caused by irregular period cycles. If brown discharge keeps appearing, a patient should schedule an appointment with a doctor to be evaluated. This could be a sign of uterine or cervical cancer. Additionally, during menopause, a woman should not have any type of vaginal bleeding, which is also a sign of uterine cancer.`;
      break;
    case 'hlog_intercourse':
      title = 'Intercourse';
      htmlContent = `Intercourse: The Log will help to keep track especially for the women’s who are either planning to conceive or avoid pregnancy.`;
      break;
    case 'hlog_test_monitor':
      title = 'Test/Monitor';
      htmlContent = `Test : You can record the details by selecting date of test conducted in the calender for following<br><br><b>Ovulation test:</b> Ovulation test are done to determine ovulation day. The <b>test</b> detects a rise in luteinizing hormone (LH) in the urine. A rise in this hormone signals the ovary to release the egg. It helps determine the time in the menstrual cycle when getting pregnant is most likely.Generally egg gets released within one to three <b>days</b> of the <b>positive ovulation test.</b> Once an egg is released, it is viable, or <b>fertile</b>, for around 24hours.<br><br>This record tracking will help you to get notification or reminder for the next three days post Ovulation test positive results to plan pregnancy and to keep track on the unique pattern for your ovulution days.<br><br>There are several ways to detect <b>ovulation</b>
        <ol>
        <li>Home urine test kits to measure LH levels.</li>
        <li>Transvaginal ultrasound</li>
        <li>Endometrial biopsy.</li>
        <li>Blood tests to measure hormone levels.</li>
        </ol><b>Pregnancy tests:</b> is to determine presence of the <b>pregnancy</b> hormone, human chorionic gonadotrophin (HCG), in urine. Your body begins to generate HCG after you conceive. If you get test result on the first day of your missed period, then you are probably about 2 weeks since you conceived. you can have either a Home kit test or urine or blood test done to <b>confirm</b> the <b>pregnancy</b>`;
      break;
    case 'birthControl':
      title = 'Birth Control';
      htmlContent = `Birth control is any method used to prevent pregnancy. These methods range from non-hormonal and hormonal to single use and long-lasting use.`;
      break;
    case 'birc_implant':
      title = 'Implant';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/implant.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center><br><b>Implant (Hormonal):</b> A small rod placed under the skin in the upper arm by a health care provider.<br><b>Mechanism of prevention:</b> Releases the hormone progestin to stop the ovaries from releasing eggs, and it thickens cervical mucus, so it is difficult for sperm to enter the uterus<br><br><b>Type: Low- maintenance</b><br><b>Effective: 99%</b><br><b>Frequency: Lasts up to 3-5 years</b>`;
      break;
    case 'birc_iud':
      title = 'Intrauterine Device (IUD)';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/intra-uterine-device.jpg width="${moderateScale(
        220,
      )}" height="${moderateScale(
        120,
      )}"> </center><br><b>IUD (Non-hormonal/Hormonal):</b> A small t-shaped device that is placed inside of the uterus by a health care provider. Available in non-hormonal (copper) and hormonal (plastic) options, the IUD is one of the most effective forms of birth control.<br><b>Mechanism of prevention:</b> Non-hormonal and hormonal IUDs work to prevent sperm from fertilizing an egg<br><br><b>Type: Low- maintenance<br>Effective: 99%<br>Frequency: Lasts up to 3-10 years</b>`;
      break;
    case 'birc_shot':
      title = 'Shot';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/shot-hormones.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center><br><b>The Shot (Hormonal):</b> An injection given by a medical professional of the hormone progestin in the arm or hip<br><b>Mechanism of prevention:</b> The shot, also known as Depo-Provera, stops the ovaries from releasing eggs and thickens the cervical mucus, so it is difficult for sperm to enter the uterus.<br><br><b>Type: Used on a Schedule<br>Effective: 94%<br>Frequency: Get every 3 months</b>`;
      break;
    case 'birc_vaginal_ring':
      title = 'Vaginal Ring';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/vaginal-ring.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center><br><b>The Vaginal Ring (Hormonal):</b> A flexible ring that is inserted into the vagina each month for three weeks at a time<br><b>Mechanism of prevention:</b> The vaginal ring releases hormones that stop the ovaries from releasing eggs and thickens cervical mucus, so it is difficult for sperm to enter the uterus.<br><br><b>Type: Used on a Schedule<br>Effective: 91%<br>Frequency: Replace Monthly</b>`;
      break;
    case 'birc_patch':
      title = 'Patch';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/patch.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center><br><b>Patch (Hormonal):</b> The patch is applied (like a sticker) weekly anywhere on the skin (except for the breasts).<br><b>Mechanism of prevention:</b> The patch releases hormones that stop the ovaries from releasing eggs and thickens cervical mucus, so it is difficult for sperm to enter the uterus.<br><br><b>Type: Used on a Schedule<br>Effective: 91%<br>Frequency: Replace Weekly</b>`;
      break;
    case 'birc_tubal_ligation':
      title = 'Tubal Ligation';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/tubal-ligation.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"> </center><br><b>Tubal Ligation (Surgical):</b> sometimes called sterilization, female sterilization, or “getting your tubes tied” is a safe and effective surgical procedure.<br><b>Mechanism of prevention:</b> As fallopian tubes are blocked after a tubal ligation, sperm can't get to an egg and cause pregnancy.<br><br><b>Type: Permanent<br>Effective: 99%<br>Frequency: Lasts for Life</b>`;
      break;
    case 'birc_diaphragm':
      title = 'Diaphragm';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/diaphragm.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Diaphragm:</b> is a shallow, bendable cup that you put inside your vagina.<br><b>Mechanism of prevention:</b> Acts a barrier that covers your cervix, stopping sperm from joining an egg. In order for a diaphragm to work best, it must be used with spermicide (a cream or gel that kills sperm).<br><br><b>Effective: 88%<br>Frequency: Use Every time</b>`;
      break;
    case 'birc_sponge':
      title = 'Sponge';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/sponge.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Sponge:</b> is a small, round sponge made from soft, squishy plastic. You put it deep inside your vagina before sex. Each sponge has a fabric loop attached to it to make it easier to take out.<br><b>Mechanism of prevention:</b> The sponge prevents pregnancy two ways: It fits snugly against your cervix, blocking the entrance to your uterus so sperm can’t get to your egg. The sponge also contains spermicide, which slows sperm down so it can’t reach your egg.<br><br><b>Effective: 76- 88%<br>Frequency: Use Every time</b>`;
      break;
    case 'birc_cervical_cap':
      title = 'Cervical Cap';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/cervical-cap.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Cervical Cap:</b> A little cup made from soft silicone and shaped like a sailor's hat.<br><b>Mechanism of prevention:</b> Is put deep inside vagina to cover the cervix, stopping sperm from joining an egg. In order for a cervical cap to work best, it must be used with spermicide (a cream or gel that kills sperm).<br><br><b>Effective: 71- 86%<br>Frequency: Use Every time</b>`;
      break;
    case 'birc_fertility_awareness_method':
      title = 'Fertility awareness Method';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/natural-family-planning.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Fertility Awareness/ Natural Family Planning (Non-hormonal):</b> Natural family planning.<br><b>Mechanism of prevention:</b> involves a woman tracking her monthly cycle from her period through ovulation to determine when she is most and least likely to get pregnant.<br><br><b>Type: Life style<br>Effective: 73%<br>Frequency: Use Daily</b>`;
      break;
    case 'birc_abstinence':
      title = 'Abstinence';
      htmlContent = `<b>Abstinence :</b> is the simple form of birth control.if two people don't have sex,sperm can't fertilize an egg and there's no possibility of pregnancy.`;
      break;
    case 'birc_pill':
      title = 'Pill';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/pills.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>The Pill (Hormonal) –</b> A pill that should be taken at the same time every day for maximum effectiveness, which is often used to reduce cramping and bleeding during periods<br><br><b>Mechanism of prevention:</b> The pill releases hormones (progestin-only or a combination of hormones) to stop the ovaries from releasing eggs and thickens cervical mucus, so it is difficult for sperm to enter the uterus<br><br><b>Type: Used on a Schedule<br>Effective: 91%<br>Frequency: Take Daily</b>`;
      break;
    case 'birc_condoms':
      title = 'Condoms';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/condoms.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Condoms (Non-hormonal)</b> Available in latex or polyurethane.<br><br><b>Mechanism of prevention:</b> Condoms are placed over an erect penis to stop sperm from entering the vagina during ejaculation<br><br><b>Type: Use Every time<br>Effective: 85%<br>Frequency: Use Every time</b>`;
      break;
    case 'birc_spermicide':
      title = 'Spermicide';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/spermicide.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Spermicide:</b> Made with sperm-killing chemicals, spermicides such as foams, suppositories or film (used separately, not in combination)<br><br><b>Mechanism of prevention:</b> Placed inside the vagina shortly before sex, spermicides block the cervix and keep sperm from joining with an egg.<br><br><b>Effective: 82%<br>Frequency: Use Every time</b>`;
      break;
    case 'birc_emergency_contraception':
      title = 'Emergency Contraception';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/emergency-contraceptive.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Emergency Contraception (Hormonal & Non-hormonal):</b> can be used up to five days after unprotected sex. It can come in the form of a pill or copper IUD.<br><br><b>Mechanism of prevention:</b> by preventing ovulation and thickening cervical mucus, but it does NOT cause an abortion<br><br><b>Type: Use Every time<br>Effective: varying degrees of effectiveness<br>Frequency: up to 5 days after unprotected sex</b>`;
      break;
    case 'birc_withdrawal':
      title = 'Withdrawal';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/withdrawal.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Mechanism of prevention:</b> Pulling the penis out of the vagina before ejaculation.
Remember, there is always a chance of pregnancy if sperm is introduced to the vagina.<br><br><b>Type: Life style<br>
Effective: 73%<br>Frequency: Use Daily</b>`;
      break;
    case 'birc_internal_condom':
      title = 'Internal Condom';
      htmlContent = `<center><img src=https://access.evecare.app/mobile-assets/birth-control/internal-condom.jpg width="${moderateScale(
        120,
      )}" height="${moderateScale(
        120,
      )}"></center><br><b>Internal Condom:</b> Insertive/female condoms are inserted into the vagina<br><br><b>Effective: 79%<br>Frequency: Use Every time</b>`;
      break;
    case 'calendar':
      title = 'Calendar';
      htmlContent = `Calendar will help to keep track of your Periods as well as record any physical symptoms or emotions experienced on a particular day.<br><br>You can log your period by clicking on the date to start or end Period. It displays the length of your menstrual cycle, Ovulation days and fertile period.<br><br>You can use it for :
     <ol>
     <li>Track potential predicted dates for your upcoming next six menstrual cycle.</li>
     <li>Planning to conceive by highlighting potential predicted fertile window and ovulation day.</li>
     <li>To avoid Pregnancy by keeping a track on fertile window.</li>
     <li>Track physical &/or emotional symptoms</li>
     </ol><b>The red</b> (current period) & <b>pink</b> (predicted future period) highlighted days defines the Period length.
The <b>yellow</b> highlighted days represent potential average fertile days during current or future monthly cycle.<br><center><img src=https://access.evecare.app/mobile-assets/calendar-flower.jpg width="${moderateScale(
        220,
      )}" height="${moderateScale(
        100,
      )}"></center><br>The flower icon represents the potential ovulation day.<br><center><img src=https://access.evecare.app/mobile-assets/calendar-notes-icon.jpg width="${moderateScale(
        220,
      )}" height="${moderateScale(
        100,
      )}"></center><br>The triangle icon at the bottom of the square for a particular day<br></center><br>Any recording of symptoms or emotions on a particular day will be displayed as.<br><center><img src=https://access.evecare.app/mobile-assets/calendar-notes-popup.jpg width="${moderateScale(
        250,
      )}" height="${moderateScale(300)}"></center><br>`;
      break;
    default:
      break;
  }
  return {title, htmlContent};
};

export default InfoModal;
