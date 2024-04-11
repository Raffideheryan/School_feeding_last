import "../vote/Vote.css";
import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../UserContext";

export const Terms = () => {
  const { userState, userActions } = useContext(UserContext);

  return (
    <>
      {userState.modal && (
        <div className="modal">
          <div className="overlay" onClick={userActions.toggleModal}></div>

          <div className="modal-content">
            <h2 className="firsttitle">ԱՌՑԱՆՑ ՔՎԵԱՐԿՈՒԹՅԱՆ ԿԱՆՈՆՆԵՐԸ</h2>
            <ul>
              <li>
              Բաց առցանց քվեարկություն անցկացնելու նպատակով Մրցույթի կազմակերպիչները հրապարակում են մասնակիցների նախագծերը Մրցույթի պաշտոնական կայքում և ժամկետներին համապատասխան ապահովում են ֆունկցիոնալությունը, որը թույլ է տալիս համացանցի օգտատերերին մասնակցել քվեարկությանը:
              </li>
              <li>
                
Առցանց քվեարկությունը կսկսվի 12:00-ին և կավարտվի  23:59-ին:
              </li>
              <li>
              Բաց առցանց քվեարկությանը կարող են մասնակցել պաշտոնական կայքում էլեկտրոնային փոստի միջոցով գրանցված օգտատերերը։
              </li>
              <li>
              Բաց առցանց քվեարկությանը մասնակցող օգտատիրոջը թույլատրվում է մրցույթի մասնակիցների յուրաքանչյուր նախագծի համար քվեարկել ոչ ավել, քան մեկ անգամ՝  յուրաքանչյուր անվանակարգում քվեարկելով ոչ ավել, քան մեկ նախագծի համար:
              </li>
              <li>
              Մրցույթի մասնակիցն իրավունք ունի իրականացնել տեղեկատվական արշավներ՝ տեղեկացնելով համացանցի օգտատերերին բաց առցանց քվեարկության մասին՝ ներառյալ սոցիալական ցանցերում տեղեկատվություն և հիպերհղումներ տեղադրելը:
              </li>
              <li>
              Մրցույթի արդյունքների կեղծումը կանխելու նպատակով առցանց քվեարկությանը մասնակցող օգտատերերին, ինչպես նաև մրցույթի մասնակիցներին արգելվում է.
                <ul>
                  <li>
                  նախագծի օգտին ձայների կեղծման ցանկացած ձև՝ ներառյալ սպամ նամակագրությունը մրցույթի մասնակցի նախագծի օգտին քվեարկելու կոչերով.
                  </li>
                  <li>
                  մրցույթի մասնակցի կամ նրա հետ փոխկապակցված անձանց կողմից վարձատրության դիմաց քվեարկության կազմակերպումը.
                  </li>
                  <li>
                  մասնակցի նախագծի օգտին քվեարկելու՝ օգտատերերին ստիպելու ցանկացած ձև:
                  </li>
                </ul>
              </li>
              <li>Եթե ​​բացահայտվի ձայները կեղծելու փաստը, ապա նախագիծը կհեռացվի քվեարկությունից եվ դրա մասնակցությունը մրցույթին կկասեցվի։։</li>
              <li>Նախագծերի համար բաց առցանց քվեարկության արդյունքները որոշվում են նախագծի «հանրային արձագանքի ցուցիչը» հաշվարկելով՝ օգտագործելով հետևյալ բանաձևը.     
Հանրային արձագանքի ցուցիչ = նախագծին տրված ձայների քանակը / քվեարկության մասնակիցների թվին</li>
            </ul>
            <h2>ՄԻԱՎՈՐՆԵՐԻ ՀԱՇՎԱՐԿԸ </h2>
            <p>Վերջնական միավորները կհաշվարկվեն Ընտրող հանձնաժողովի գնահատման և առցանց քվեարկության արդյունքների հիման վրա:</p>
            <p>Մրցույթի արդյունքների հաշվարկի մեջ հաշվի կառնվի Ընտրող հանձնաժողովի գնահատականի (առավելագույնը 36 միավոր) նշանակությունը, որը կազմում է 80%: Հետևաբար՝ առավելագույն միավորը 45ն է։ Առցանց քվեարկության նշանակությունը 20% է (9 միավոր):</p>

            <p className="textstyle">Այս 9 միավորները կբաշխվեն յուրաքանչյուր անվանակարգում քվեարկության մասնակիցների միջև։</p>
            <p>Այսպիսով, մասնակիցների <span>ընդհանուր միավորը</span>  կհաշվարկվի հետևյալ բանաձևով.</p>
            <p>Ընդհանուր միավոր = Գնահատման միավոր + Հանրային արձագանքի ցուցիչ*9</p>
            <p className="acsept">Ես տալիս եմ համաձայնություն՝ օգտագործել  բոլոր ներբեռնված նյութերը, հաստատելով հետևյալը․</p>
            <p className="acseptall">
            ՀՀ առողջապահության նախարարության, ՀՀ կրթության, գիտության, մշակույթի և սպորտի նախարարության, ՄԱԿ-ի Պարենի համաշխարհային ծրագրի հայաստանյան գրասենյակի (ՊՀԾ), ՌԴ Ճյուղային սննդի ինստիտուտի (SIFI), «Դպրոցական սնունդ և երեխաների բարեկեցություն» հիմնարկի կողմից կազմակերպված “Առողջ ապրելակերպի դեսպան” մրցույթի շրջանակներում,հաստատում եմ, որ տրամադրում եմ վերոնշյալ կազմակերպություններին անհատական տվյալների մշակման թույլտվություն, տեքստային նյութերի և պատկերների օգտագործում առանց տարածքային և ժամկետային սահմանափակումների, ցանկացած նպատակներով, որոնք չեն հակասում Հայաստանի Հանրապետության գործող օրենսդրությանը:Ես հրաժարվում եմ տեքստային նյութեր, տեսանյութեր/լուսանկարներ ուղղելու իրավունքից կամ միջամտելու հեղինակի՝ իր տեքստային նյութերը, տեսանյութերը/լուսանկարները հրապարակելու իրավունքը: Թույլատրում եմ տեքստային նյութերի խմբագրումը, տեսանյութերի/լուսանկարների մշակումը,  ռետուշը, մթնեցումը կոմպոզիցիաների մեջ, ինչպես կանխամտածված, այնպես էլ ոչ կանխամտածված, տեքստային նյութի կամ տեսանյութի վերջնական տարբերակի հրապարակման նախապատրաստման ընթացքում: Ես հաստատում եմ, որ չեմ վիճարկելու այդ տեքստային նյութերի, տեսանյութերի/լուսանկարների հեղինակային և գույքային իրավունքները:
            </p>
            <IoMdClose
              className="close-modal"
              onClick={userActions.toggleModal}
            />
          </div>
        </div>
      )}
    </>
  );
};
