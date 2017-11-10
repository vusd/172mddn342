var canvasWidth = 960;
var canvasHeight = 500;
var button;
var curRandomSeed;
var mainFace;
var faceImages = [];
var curFaceIndex = 0;
var curTrainIndex = 0;
var curValidIndex = 0;
var main_canvas;
var submissionSelector;
var faceSelector;
var facelist = [];
var NUMFACES = 6*9;
var sliders = [];
var NUM_SLIDERS = 12;
var sliderTint;

var faceData = [
  {"landmarks": [{"nose_bridge": [[-0.09083664800859323, -1.1331171913324525], [-0.08996869920096179, -0.7900363379039251], [-0.08910075039333033, -0.4469554844753977], [-0.08823280158569889, -0.10387463104687027]], "left_eyebrow": [[-1.4637609493587556, -1.3671629100139842], [-1.2796259928409857, -1.6051477809763048], [-0.9895271050493772, -1.6850547038354993], [-0.6727703212070726, -1.6594650524711185], [-0.38220407636520126, -1.5546361311764905]], "left_eye": [[-1.119945677708386, -1.0777316751513233], [-0.9354768947261425, -1.1837623717180563], [-0.7243502156932026, -1.1842964940612142], [-0.539147014489117, -1.0000280069576548], [-0.7238160933500448, -0.9731698150282742], [-0.9614003725549969, -0.9989597622713392]], "right_eye": [[0.49009554579646525, -1.0026318533805492], [0.6743640329000248, -1.1878350545846348], [0.9118147815191875, -1.2148267770998047], [1.0968844521374834, -1.0833399597544804], [0.9122821385694505, -1.0300909329459822], [0.6748313899502878, -1.0030992104308123]], "nose_tip": [[-0.45710360225729124, 0.1345775969657134], [-0.27223422751767934, 0.18689190967368527], [-0.06104078319184466, 0.21274862220964497], [0.12356153037618835, 0.15949959540114686], [0.3610122789953511, 0.13250787288597685]], "chin": [[-1.7000099227058132, -0.8651361596746993], [-1.7252657476057203, -0.4164252014368071], [-1.671349067868275, 0.03208546092240083], [-1.5646507183725944, 0.4804625926958193], [-1.4051706991186794, 0.9287061938834484], [-1.140327636226978, 1.297510229262146], [-0.8490937384561595, 1.666247499347949], [-0.5052784668057901, 1.95567873421061], [-0.029976377810096287, 2.060040298454975], [0.4448583541353344, 1.9796660185455173], [0.9193592596162916, 1.7673375642404725], [1.3407446688745401, 1.423188466125629], [1.6828908082025413, 1.0528488290103528], [1.8401008074980358, 0.6038040443079871], [1.9180715368632832, 0.12856872060518798], [1.9695846660565184, -0.37299067268383396], [1.9683828907844134, -0.8480257005079488]], "bottom_lip": [[0.8635731516777938, 0.5798835252659744], [0.5742754474009223, 0.9764804666745788], [0.205137585557751, 1.1093693551706925], [-0.03231316306141173, 1.1363610776858626], [-0.29622151185258666, 1.1370287306148097], [-0.5869212872802475, 0.9794181395619468], [-0.8516975848790539, 0.6370049390623667], [-0.7460674800696891, 0.6631287127699053], [-0.2704315646095217, 0.8994444514098576], [-0.03284728540456954, 0.9252343986529226], [0.2046034632145932, 0.8982426761377525], [0.8108582472124536, 0.6064078907308814]], "transform": {"angle": 0.002529861247795008, "center": [186.33333333333334, 183.94444444444446], "scale": 37.89182132672947}, "top_lip": [[-0.8516975848790539, 0.6370049390623667], [-0.5615986970874456, 0.5570980162031721], [-0.27149980929583734, 0.47719109334397775], [-0.03384876479799044, 0.52937187546616], [0.17714438364916008, 0.47605608336476735], [0.5467496025425944, 0.527903039022476], [0.8635731516777938, 0.5798835252659744], [0.8108582472124536, 0.6064078907308814], [0.17754497540652844, 0.6344010926394723], [-0.03344817304062208, 0.6877168847408651], [-0.27103245224557426, 0.6619269374978002], [-0.7460674800696891, 0.6631287127699053]], "right_eyebrow": [[0.22478512585450108, -1.556171732913069], [0.567532152818555, -1.6889938561162883], [0.9369370758333051, -1.7163194050959316], [1.2802182251405168, -1.6380148492662108], [1.5447274615677442, -1.4011649882831005]]}], "url": "z_face1.jpg", "embedding": [[-0.09812457114458084, 0.11998496949672699, 0.06276129186153412, -0.05255047231912613, -0.12243147939443588, -0.03132074326276779, -0.09414154291152954, -0.1242457777261734, 0.07002627849578857, -0.08147289603948593, 0.2814253270626068, -0.04594751447439194, -0.22189925611019135, -0.1113772839307785, -0.11815732717514038, 0.2204407900571823, -0.14725343883037567, -0.10374704003334045, -0.08243671804666519, 0.005101572722196579, 0.12012264132499695, -0.0025456342846155167, 0.0014407113194465637, 0.0015963278710842133, -0.08633701503276825, -0.33422884345054626, -0.045525021851062775, -0.03229425102472305, -0.03990006074309349, -0.06796583533287048, -0.04964607208967209, 0.027314048260450363, -0.234699085354805, -0.03814394026994705, 0.02356778085231781, 0.053027696907520294, -0.050578296184539795, -0.06693702191114426, 0.14406313002109528, 0.018536454066634178, -0.22719770669937134, 0.047739796340465546, 0.06735788285732269, 0.19067732989788055, 0.182114377617836, 0.019334735348820686, 0.054091211408376694, -0.15950612723827362, 0.13529177010059357, -0.20682178437709808, 0.021643809974193573, 0.18243306875228882, 0.07248902320861816, 0.06592673063278198, 0.015211593359708786, -0.08783256262540817, 0.03786002844572067, 0.13478770852088928, -0.09582363814115524, 0.016811812296509743, 0.11877749860286713, -0.05823524296283722, -0.0877673402428627, -0.121843121945858, 0.20835383236408234, 0.08842334151268005, -0.13640394806861877, -0.18775177001953125, 0.11289231479167938, -0.09115668386220932, -0.10935712605714798, 0.04192322492599487, -0.15002340078353882, -0.19342319667339325, -0.3086214065551758, 0.048502061516046524, 0.36910122632980347, 0.132289320230484, -0.23331473767757416, 0.03634979575872421, -0.08015844225883484, 0.0484822653234005, 0.12521624565124512, 0.12101111561059952, 0.008804835379123688, 0.0336700864136219, -0.09477405250072479, -0.01780793070793152, 0.22713540494441986, -0.07723923027515411, -0.023343967273831367, 0.264713853597641, 0.0039475541561841965, 0.061221860349178314, 0.009781097993254662, 0.019018054008483887, -0.07865786552429199, 0.0058430954813957214, -0.11374843120574951, -0.03492026403546333, 0.050761688500642776, -0.041851382702589035, -0.020709838718175888, 0.09610284864902496, -0.1072147861123085, 0.10397015511989594, -0.044768959283828735, 0.10082380473613739, 0.04071452468633652, -0.02748667635023594, -0.09102319180965424, -0.07456323504447937, 0.06832525879144669, -0.1713019609451294, 0.24891397356987, 0.14487513899803162, 0.0664646327495575, 0.06269458681344986, 0.20069821178913116, 0.09950415045022964, -0.002668582834303379, -0.016219403594732285, -0.1644577980041504, -0.06623447686433792, 0.10705346614122391, -0.022745352238416672, 0.059049054980278015, -0.034697555005550385]]},
  {"url": "z_face2.jpg", "embedding": [[-0.10002943128347397, -0.002971264533698559, 0.04409882426261902, -0.08042342960834503, -0.13918328285217285, -0.05096873641014099, -0.0675748884677887, -0.03445271775126457, 0.17213879525661469, -0.1289740800857544, 0.20593279600143433, -0.038095682859420776, -0.20807456970214844, -0.03513205423951149, 0.04067589342594147, 0.18801690638065338, -0.20172590017318726, -0.14577223360538483, -0.06354935467243195, -0.0328928679227829, 0.007761724293231964, 0.06754852831363678, 0.01997918263077736, 0.0867898017168045, -0.23197656869888306, -0.36380860209465027, -0.08826257288455963, -0.15048570930957794, -0.028067536652088165, -0.006293401122093201, 0.01313356589525938, 0.1122763603925705, -0.18493340909481049, -0.03600311279296875, 0.07104189693927765, 0.10923558473587036, -0.014780500903725624, -0.053669825196266174, 0.21474239230155945, 0.043618202209472656, -0.24918276071548462, -0.04855405539274216, 0.05416091904044151, 0.2509222626686096, 0.11213052272796631, -0.008110547438263893, 0.060037221759557724, -0.020381931215524673, 0.12973971664905548, -0.26530784368515015, 0.005873171612620354, 0.14386363327503204, 0.05093163251876831, 0.06247718259692192, 0.12190939486026764, -0.10820997506380081, 0.08467353880405426, 0.153029203414917, -0.22401994466781616, 0.018371853977441788, -0.0064929090440273285, -0.007204247638583183, 0.001340152695775032, -0.027905315160751343, 0.25697019696235657, 0.11021729558706284, -0.10640345513820648, -0.10520730167627335, 0.1669047623872757, -0.11952564120292664, -0.07537998259067535, 0.11944880336523056, -0.16234096884727478, -0.18609827756881714, -0.3132040798664093, -0.05591844767332077, 0.4329444468021393, 0.08397790789604187, -0.18753360211849213, 0.052566226571798325, -0.012145612388849258, -0.06690485030412674, 0.09321217238903046, 0.10295377671718597, -0.020737331360578537, 0.06169183924794197, -0.05560031533241272, 0.083901546895504, 0.23535601794719696, -0.03588230162858963, 0.01774720288813114, 0.2265700399875641, 0.04118061065673828, 0.023799866437911987, 0.06956352293491364, 0.04878733307123184, -0.043150097131729126, -0.06510938704013824, -0.12393594533205032, 0.0016987025737762451, 0.08229243010282516, -0.012456422671675682, -0.019080791622400284, 0.08945812284946442, -0.17775820195674896, 0.1187109649181366, 0.01918645016849041, -0.06475910544395447, -0.05718757212162018, 0.07448309659957886, -0.0888402909040451, -0.058351099491119385, 0.13630631566047668, -0.24056236445903778, 0.16022630035877228, 0.1560491919517517, -0.08275251090526581, 0.11594061553478241, -0.010273986496031284, 0.013581231236457825, -0.08263693749904633, -0.04651876911520958, -0.1439516544342041, -0.10474348068237305, 0.0713956207036972, -0.021647857502102852, 0.056770212948322296, -0.0075003779493272305]], "landmarks": [{"bottom_lip": [[0.8927581592050962, 0.6424316486467727], [0.5537825636977446, 0.9192459519869604], [0.2746815917751089, 1.0262170020798214], [0.05095887408256518, 1.0374194415612454], [-0.17126505382510382, 1.0239303334973733], [-0.487758802559335, 0.9303714236581127], [-0.8663368756504581, 0.6347837641018552], [-0.7196863801635536, 0.6684680503564], [-0.15627715597635683, 0.7770148580444077], [0.03975643460114093, 0.813696723868702], [0.2649779420785594, 0.7778027368419811], [0.7431100841484422, 0.6581304574828212]], "top_lip": [[-0.8663368756504581, 0.6347837641018552], [-0.4667757455710892, 0.5846897580239607], [-0.1412892581276098, 0.5300993825914422], [0.054744332449887946, 0.5667812484157364], [0.2552742923820098, 0.5293884716041408], [0.5485752833558191, 0.5967570441132304], [0.8927581592050962, 0.6424316486467727], [0.7431100841484422, 0.6581304574828212], [0.2462815536727616, 0.6775377568759201], [0.04725038352551444, 0.6902389861422192], [-0.15028199683685803, 0.6782486678632216], [-0.7196863801635536, 0.6684680503564]], "left_eye": [[-1.3413175025300474, -0.9305643487586496], [-1.0839104985829588, -1.0884172837269783], [-0.7629203804941037, -1.068933016523607], [-0.5048024655597139, -0.8302224009823166], [-0.7809058579126001, -0.7726344459800486], [-1.1265875235467522, -0.7936175029682944]], "nose_tip": [[-0.36422409702258013, 0.12004672401795025], [-0.1681905064450824, 0.15672858984224444], [0.02784308413241536, 0.1934104556665386], [0.2283730440645372, 0.15601767885494308], [0.4042114564513625, 0.11712611225847289]], "right_eyebrow": [[0.43055572940207787, -1.5417039426310204], [0.7867289235303526, -1.6935617184598504], [1.1600997162795503, -1.7204629667773232], [1.5244777703194998, -1.5992149298230165], [1.704024673263376, -1.2909260410004604]], "right_eye": [[0.5105485633671942, -0.8181551148930469], [0.749259178908485, -1.0762730298274366], [1.0717480867822151, -1.0814803101693622], [1.3081720337410576, -0.8936515795035391], [1.101646914669437, -0.7574926125107575], [0.779158006795707, -0.7522853321688321]], "nose_bridge": [[0.02720914095538606, -1.0209717434076166], [0.03391521108218621, -0.7231743830791834], [0.04212007099386105, -0.4500685702960466], [0.050324930905535886, -0.17696275751290974]], "transform": {"center": [272.40277777777777, 193.26388888888889], "angle": -0.060626133324491974, "scale": 40.42528306397457}, "left_eyebrow": [[-1.7879750591175618, -1.3294145678507174], [-1.5477656537913962, -1.6122240303304036], [-1.1683997019026995, -1.7378914688290623], [-0.7748337309628293, -1.6892192847257705], [-0.3857641293775832, -1.5664724579865892]], "chin": [[-2.1082542662191153, -0.9523352845444687], [-2.0394638717354234, -0.45250917449903877], [-1.9444831399215596, 0.024124177785969342], [-1.8218132809926504, 0.45287322476525904], [-1.6250687794278513, 0.8861186410991729], [-1.3235629285423673, 1.2265930263913993], [-0.944984855451244, 1.5221806859476563], [-0.5125273179149036, 1.7466912824377736], [-0.02169394657872184, 1.826050173225861], [0.45344061592141155, 1.7557609889572938], [0.8649920642797783, 1.508134602517027], [1.2286592073324263, 1.232819088961714], [1.5212492873189345, 0.903624110961184], [1.7195695464788803, 0.4943593311852654], [1.7974296474820926, 0.02821750739438028], [1.8490994111551338, -0.4147315586360831], [1.9022679646130496, -0.882372172211843]]}]},
  {"landmarks": [{"nose_bridge": [[-0.11915309753870079, -1.0774219445207711], [-0.13194185058151556, -0.7736549202224418], [-0.17555954511257515, -0.4195113024623971], [-0.18834829815538986, -0.11574427816406752]], "left_eye": [[-1.1424886468718944, -1.0458639582140303], [-0.9590224614704648, -1.1759386230976654], [-0.7056320306338502, -1.1939788115430956], [-0.48457800481352026, -0.989457510640156], [-0.68759184218842, -0.9405883807064809], [-0.9409822730250346, -0.9225481922610508]], "top_lip": [[-0.7026664774688184, 0.7812605781600669], [-0.5289741180541238, 0.6105831458014519], [-0.28535751320424413, 0.5519401898810417], [-0.14400155880583426, 0.6038242468707966], [0.059012278569065435, 0.5549551169371215], [0.34172418736588517, 0.658723230916631], [0.6748126896244199, 0.7933202863843856], [0.543230561212745, 0.7820389968696106], [0.06727864102776064, 0.7677427802987561], [-0.10490625485889415, 0.7662353167707163], [-0.2770911507455489, 0.7647278532426764], [-0.5808581750438785, 0.7519391001998618]], "left_eyebrow": [[-1.4936173375758595, -1.4338514445183996], [-1.26954838469945, -1.5736999353887697], [-0.9755551863878553, -1.601513949820935], [-0.6717881620895256, -1.5887251967781202], [-0.37930242730597086, -1.4443543153236307]], "transform": {"scale": 23.944885517334836, "center": [241.73611111111111, 127.75], "angle": 0.23622397528318634}, "right_eyebrow": [[0.20868396931721833, -1.4999823441879612], [0.5545612246185678, -1.6691523130185362], [0.8891571904051424, -1.7067401534374365], [1.2839035756401669, -1.672896284893112], [1.5763893104237214, -1.5285254034386222]], "right_eye": [[0.45755200956971354, -1.001467844973427], [0.6718471364593881, -1.1819191033187768], [0.9658403347709826, -1.2097331177509423], [1.1771205346045774, -1.0458145843229827], [0.9838805232164127, -0.9563426869143276], [0.6898873249048183, -0.9285286724821623]], "nose_tip": [[-0.43347236653330934, 0.11508357364299744], [-0.28234258614816443, 0.20757039810773217], [-0.14098663174975457, 0.259454455097487], [0.062027205625145125, 0.21058532516381184], [0.21466444953832986, 0.13088725374189183]], "chin": [[-1.6394956825583888, -0.9691808138481901], [-1.653791899129243, -0.4932288936632056], [-1.5868825807501379, -0.036824625451691295], [-1.5199732623710325, 0.419579642759823], [-1.3718584090419674, 0.8564362589978674], [-1.1523118467496776, 1.2331424557874615], [-0.8207308080191824, 1.539924407141871], [-0.4989235952754227, 1.8061035910213004], [-0.0034240231169682667, 1.9016053425421149], [0.4935830125695261, 1.8249221981762747], [1.042474105245775, 1.6068830994120242], [1.521440952486839, 1.2768095242095692], [1.9094284387912084, 0.9256808335056042], [2.1056833772354526, 0.49183914432363957], [2.191411302769532, -0.044263195309794834], [2.2463102868153664, -0.5299889414815142], [2.2508326773994862, -1.0465436291414787]], "bottom_lip": [[0.6748126896244199, 0.7933202863843856], [0.3387092603098055, 1.0030930226899408], [0.054489887984945945, 1.071509804597086], [-0.1582977753766888, 1.079776167055781], [-0.34025649725007867, 1.0376659360527611], [-0.5319890451102034, 0.9549529375747614], [-0.7026664774688184, 0.7812605781600669], [-0.5808581750438785, 0.7519391001998618], [-0.31769391822052884, 0.7745016792294115], [-0.13573519634713904, 0.8166119102324313], [0.0266758735527807, 0.7775166062854911], [0.543230561212745, 0.7820389968696106]]}], "url": "z_face3.jpg", "embedding": [[-0.05519425496459007, 0.03493059054017067, 0.08143620938062668, -0.08901284635066986, -0.14302502572536469, -0.02416623942553997, -0.09756344556808472, -0.08315102756023407, 0.23946982622146606, -0.15162669122219086, 0.09232431650161743, -0.014769241213798523, -0.15266633033752441, 0.0738283321261406, -0.08435601741075516, 0.1452733278274536, -0.09795519709587097, -0.16579927504062653, -0.09493180364370346, -0.062312837690114975, -0.08847658336162567, 0.021459033712744713, -0.00294596329331398, 0.012956537306308746, -0.12360681593418121, -0.35962730646133423, -0.08465795964002609, -0.05886299908161163, -0.014770012348890305, 0.003773917444050312, -0.023260220885276794, 0.10789743810892105, -0.1129622533917427, -0.047460466623306274, 0.04806378483772278, 0.11290744692087173, -0.09416302293539047, -0.0867939442396164, 0.24747592210769653, 0.03254516422748566, -0.22027653455734253, 0.0030573979020118713, 0.08847130835056305, 0.2831569314002991, 0.22063785791397095, 0.03714641183614731, 0.13540662825107574, -0.1261082887649536, 0.14653107523918152, -0.3661941885948181, 0.0811522826552391, 0.16923867166042328, 0.011623818427324295, 0.09494776278734207, 0.13868921995162964, -0.17209285497665405, 0.023121878504753113, 0.1638849526643753, -0.1638297140598297, 0.10636025667190552, 0.07150483876466751, 0.000995999202132225, -0.05054526403546333, -0.06572765111923218, 0.3229401111602783, 0.18288353085517883, -0.11134769022464752, -0.16417694091796875, 0.28029778599739075, -0.16538552939891815, -0.06219102442264557, 0.07175640761852264, -0.08962765336036682, -0.22000420093536377, -0.22248777747154236, 0.01842578500509262, 0.3819790482521057, 0.22037602961063385, -0.09785779565572739, 0.10503733158111572, -0.15017080307006836, -0.04053933173418045, 0.008872395381331444, 0.08559748530387878, -0.006650010123848915, -0.02032337710261345, -0.028860213235020638, -0.012347746640443802, 0.2899158298969269, -0.01995079219341278, 0.008609645068645477, 0.22352749109268188, 0.07356566190719604, -0.04810752719640732, -0.03028353489935398, 0.08436368405818939, -0.15227405726909637, 0.02202434279024601, -0.20539432764053345, -0.059333980083465576, 0.10269267857074738, 0.023140307515859604, 0.05972312390804291, 0.12896883487701416, -0.2676396667957306, 0.24129846692085266, -0.08049461990594864, -0.034685902297496796, 0.028595078736543655, -0.032721344381570816, -0.009528398513793945, 0.0033172406256198883, 0.22001129388809204, -0.27409398555755615, 0.15639911592006683, 0.1383773386478424, 0.07004918903112411, 0.18882378935813904, 0.07051581889390945, 0.038776811212301254, 0.0793108195066452, -0.06640178710222244, -0.1935870349407196, -0.0840207114815712, -0.048229992389678955, -0.012153556570410728, -0.03877771645784378, 0.15794801712036133]]}
]


var submissions = [
  "alteste",
  "christinapetris",
  "hannahdockerty",
  "MKDD",
  "PPYYInvisible"
]
var submissionTable = {}
var curSubmissionIndex = 0;

var trainData = {}
var trainDataKeys = []
var validData = {}
var validDataKeys = []

var faceMapping = null;

function getCurTrainValues() {
  var curSubmission = submissions[curSubmissionIndex];
  if ("trainValues" in submissionTable[curSubmission]) {
    return submissionTable[curSubmission]["trainValues"];  
  }
  else {
    return {};
  }
}

function getCurFaceMap() {
  var curSubmission = submissions[curSubmissionIndex];
  if ("FaceMap" in submissionTable[curSubmission]) {
    return submissionTable[curSubmission]["FaceMap"];  
  }
  else {
    return null;
  }
}

function preload () {
  extraFaceData = loadJSON('face_data.json');
  trainData = loadJSON('train_data.json');
  validData = loadJSON('valid_data.json');
  for(var i=0; i<submissions.length;i++) {
    var curKey = submissions[i];
    var sourceFile = "submissions/" + curKey + ".json"
    var curTrainValues = loadJSON(sourceFile);
    var curFacemapName = "FaceMap_" + curKey;
    var curFacemap = window[curFacemapName];
    submissionTable[curKey] = {
      "trainValues": curTrainValues,
      "FaceMap": curFacemap
    }
  }
}

var allEmbeddingsTree;
var allEmbeddings = [];
var embeddingDimensions;
var curNeighbors = [];

function squaredDistance(a, b) {
  var sum = 0;
  var length = 128;
  for(var i=0; i<128; i++) {
    var diff = a[i] - b[i];
    sum += diff * diff;
  }
  // print(a.length,diff);
  // print(sum, a==b);
  return sum;
}

var haveStarted = false;
function setup () {
  var extraFaceDataArray = Object.values(extraFaceData);
  Array.prototype.unshift.apply(faceData, extraFaceDataArray);
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(focusedRandom(0, 100));

  for(var i=0; i<NUMFACES; i++) {
    var face = new Face();
    facelist.push(face);
  }

  var faceFactory = getCurFaceMap();
  if(faceFactory == null) {
    console.log("Expect bad things")
  }
  else {
    mainFace = new faceFactory();
    littleFace = new faceFactory();    
  }

  for(var i=0; i<faceData.length; i++) {
    var data = faceData[i];
    data.image = loadImage(data.url);
  }

  trainDataKeys = Object.keys(trainData);
  for(var i=0; i<trainDataKeys.length; i++) {
    var curKey = trainDataKeys[i];
    var data = trainData[curKey];
    var curEmbedding = data.embedding[0];
    if(curEmbedding.length == 128) {
      curEmbedding.push(curKey);
      allEmbeddings.push(curEmbedding);
    }
    else {
      print("rejected embedding ", curEmbedding);
    }
    data.image = loadImage(data.url);
  }

  validDataKeys = Object.keys(validData);
  for(var i=0; i<validDataKeys.length; i++) {
    var curKey = validDataKeys[i];
    var data = validData[curKey];
    data.image = loadImage(data.url);
  }

  // print("Length: ", allEmbeddings.length);
  // setup k-d tree
  var N = allEmbeddings[0].length - 1; 
  embeddingDimensions = Array.apply(null, {length: N}).map(Number.call, Number);  
  // print(embeddingDimensions)
  allEmbeddingsTree = new kdTree(allEmbeddings, squaredDistance, embeddingDimensions);
  // print(allEmbeddingsTree)

  submissionSelector = createSelect();
  for(var i=0; i<submissions.length; i++) {
    submissionSelector.option(submissions[i])
  }
  submissionSelector.parent('selector1Container');
  submissionSelector.changed(updateSubmissions);

  faceSelector = createSelect();
  faceSelector.option('Face');
  faceSelector.option('FaceMap');
  faceSelector.option('Train');
  faceSelector.option('Neighbors');
  faceSelector.option('TrainQuiz');
  faceSelector.option('ValidQuiz');
  faceSelector.value('FaceMap');
  faceSelector.parent('selector2Container');

  /* create the sliders */
  for(i=1; i<=NUM_SLIDERS; i++) {
    var slider = createSlider(0, 100, 50);
    var parentStr = 'slider' + i + 'Container';
    slider.parent(parentStr);
    sliders.push(slider);
  }

  sliderTint = createSlider(0, 100, 10);
  sliderTint.parent("sliderTintContainer");

  /* and the buttons */
  var loadButton = createButton('load');
  loadButton.mousePressed(loadCurrentSettings);
  loadButton.parent('button1Container');

  var interpButton = createButton('interpolate');
  interpButton.mousePressed(interpolateCurrent);
  interpButton.parent('button1Container');

  var saveButton = createButton('save');
  saveButton.mousePressed(saveCurrentSettings);
  saveButton.parent('button2Container');

  var getValuesButton = createButton('get values');
  getValuesButton.mousePressed(getSingleJson);
  getValuesButton.parent('button3Container');

  var randButton = createButton('get all values');
  randButton.mousePressed(getAllJson);
  randButton.parent('button4Container');

  updateSlidersForTraining();

  // rotation in degrees
  angleMode(DEGREES);

  haveStarted = true;
}

function updateSubmissions() {
  var item = submissionSelector.value();
  curSubmissionIndex = submissions.indexOf(item)
  var faceFactory = getCurFaceMap();
  if(faceFactory == null) {
    console.log("Expect bad things")
  }
  else {
    mainFace = new faceFactory();
    littleFace = new faceFactory();
  }

  // TODO: really?
  interpolateCurrent();
  loadCurrentSettings();
  updateSlidersForTraining();
}

function saveCurrentSettings() {
  var curKey = trainDataKeys[curTrainIndex];
  obj = mainFace.getProperties();
  var trainValues = getCurTrainValues();
  trainValues[curKey] = obj;
  // for(var i=0; i<obj.length; i++) {
  //   trainData[curKey][i] = obj[i];
  // }
  var text = select('#output');
  text.html("Storing values for " + curKey);
  // getAllJson();
}

function getSingleJson() {
  obj = mainFace.getProperties();
  var text = select('#output');
  var json = JSON.stringify(obj, null, 2);
  text.html(json)
}

function getAllJson() {
  var trainValues = getCurTrainValues();
  obj = trainValues;
  var text = select('#output');
  var json = JSON.stringify(obj, null, 2);
  // alert(json);
  text.html(json)
}

// global variables for colors
var bg_color1 = [50, 50, 50];

var lastSwapTime = 0;
var millisPerSwap = 5000;

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}

function mouseClicked() {
  // changeRandomSeed();
}

var quiz_done = false;
var guessed_answer = 0;

function draw () {
  /* reset state */
  colorMode(RGB);  

  var mode = faceSelector.value();
  var trainValues = getCurTrainValues();

  if(millis() > lastSwapTime + millisPerSwap) {
    lastSwapTime = millis();
    // changeRandomSeed();
  }

  resetFocusedRandom(curRandomSeed);

  noStroke();
  background(bg_color1);
  var textDisplay = "unknown";

  var params = [];
  for(var i=0; i<NUM_SLIDERS; i++) {
    params.push(sliders[i].value());
  }

  if (mode == 'Face') {
    var w = canvasWidth / 10;
    var h = canvasHeight / 6;
    var max_shift = 0.2 * w;
    var cur_face = 0;
    for(var i=0; i<6; i++) {
      for(var j=0; j<9; j++) {
        var face = facelist[cur_face];
        cur_face = cur_face + 1;

        var y = h/2 + h*i;
        var x = w/2 + w*j;

        // shift even rows over by half a face
        if(i%2 == 0) {
          x = x + w/2;
        }

        // noFill();
        // stroke(255, 0, 0);
        // rect(x-w/2, y-w/2, w, h);
        face.randomize();
        face.draw1(x, y, w, h);
        // noStroke();
        // fill(255, 0, 0);
        // ellipse(x-2, y-2, 4, 4);
      }
    }
    textDisplay = "facegrid";
  }

  else if (mode == 'FaceMap' || mode == 'Train') {
    var do_train = true;
    if (mode == 'FaceMap') {
      do_train = false;
    }
    if(do_train) {
      // var keys = Object.keys(trainData);
      var curKey = trainDataKeys[curTrainIndex];
      var data = trainData[curKey];      
    }
    else {
      var data = faceData[curFaceIndex];
    }
    // Displays the image at its actual size at point (0,0)
    var img = data.image
    var x1 = (width/4-400/2);
    var x2 = (3*width/4-400/2);
    var y1 = (height/2-400/2);

    if(do_train) {
      image(img, x1, y1, 400, 400);
      if (curKey in trainValues) {
        fill(0, 200, 0);
      }
      else {
        fill(200, 0, 0);
      }
      ellipse(x1+400/2, y1+400+15, 10, 10);      
    }

    var im_w = 400;
    var im_h = 400;
    if(!do_train) {
        x2 = 0;
        y1 = 0;
        im_w = img.width;
        im_h = img.height;
    }
    image(img, x2, y1, im_w, im_h);
    noStroke();
    var curSliderTintValue = sliderTint.value();
    var overlayAlpha = map(curSliderTintValue, 0, 100, 255, 0);
    fill(bg_color1[0], bg_color1[1], bg_color1[2], overlayAlpha);
    rect(x2, y1, im_w, im_h);
    stroke(0);
    fill(255);

    for(var i=0; i<data.landmarks.length; i++) {
      // get array of face marker positions [x, y] format
      var positions = data.landmarks[i];
      var shifted_positions = JSON.parse(JSON.stringify(positions))

      var data_mean = [0.0, 0.0];
      var data_scale = 1.0;
      var data_angle = 0.0;
      if ('transform' in positions) {
        data_mean = positions.transform.center;
        data_scale = positions.transform.scale;
        data_angle = positions.transform.angle;
        delete shifted_positions.transform
      }
      var scale_x = im_w / img.width;
      var scale_y = im_h / img.height;

      push();
      translate(x1, y1)
      translate(scale_x*data_mean[0], scale_y*data_mean[1]);
      scale(scale_x*data_scale, scale_y*data_scale);
      rotate(degrees(data_angle));

      stroke(0);
      fill(255);
      strokeWeight(1/data_scale);
      Object.keys(positions).forEach(function(key) {
        if (key=='transform') {
          return;
        }
        var curSection = positions[key];
        var shiftedSection = shifted_positions[key];
        for (var i=0; i<curSection.length; i++) {
          var cur_x = curSection[i][0];
          var cur_y = curSection[i][1];
          if(do_train) {
              ellipse(cur_x, cur_y, 3/data_scale, 3/data_scale);
          }
          // get ready for drawing the face
          shiftedSection[i][0] = cur_x;
          shiftedSection[i][1] = cur_y;
        }
      });

      noFill();
      if(do_train) {
          stroke(0, 0, 255);
          ellipse(0, 0, 4, 4);
          line(0, -2, 0, 2);
          line(-2, 0, 2, 0);
      }
      // ellipse(x1+data_mean[0], y1+data_mean[1], 4*data_scale, 4*data_scale);
      // line(x1+data_mean[0], y1+data_mean[1]-2*data_scale, x1+data_mean[0], y1+data_mean[1]+2*data_scale);
      pop();

      var settings = params;
      if ((typeof data.embedding !== 'undefined') &&
          (data.embedding != null) &&
          (data.embedding.length > i) &&
          (data.embedding[i] != null) &&
          (typeof data.embedding[i].length !== 'undefined') &&
          (data.embedding[i].length == 128)) {
        var curEmbedding = data.embedding[i];
        results = getAverageSettingsFrom(curEmbedding);
        settings = results[0];
      }

      push();
      translate(x2, y1)
      translate(scale_x*data_mean[0], scale_y*data_mean[1]);
      scale(scale_x*data_scale, scale_y*data_scale);
      rotate(degrees(data_angle));
      strokeWeight(1/data_scale);
      mainFace.setProperties(settings);
      mainFace.draw(shifted_positions);
      pop();
    }
    if(do_train) {
      textDisplay = "Train: " + curKey;
    }
    else {
      textDisplay = "";
    }
  }

  else if (mode == 'Neighbors') {
    // var keys = Object.keys(trainData);
    var curKey = trainDataKeys[curTrainIndex];
    var data = trainData[curKey];

    // Displays the image at its actual size at point (0,0)
    var img = data.image
    var x1 = (width/4-250/2);
    var y1 = (height/3-250/2);
    image(img, x1, y1, 250, 250);
    if (curKey in trainValues) {
      fill(0, 200, 0);
    }
    else {
      fill(200, 0, 0);
    }
    ellipse(x1+250/2, y1+250+15, 10, 10);

    var y2 = (3*height/4-80/2);
    for(var i=0; i<4; i++) {
      // var keys = Object.keys(trainData);
      var curKey = curNeighbors[i];
      var nearData = trainData[curKey];      

      // Displays the image at its actual size at point (0,0)
      var img = nearData.image
      var x2 = (width/4 - 200 + i*100);
      image(img, x2, y2, 80, 80);
    }

    for(var i=0; i<1; i++) {
      // get array of face marker positions [x, y] format
      var positions = data.landmarks[i];
      var shifted_positions = JSON.parse(JSON.stringify(positions))

      var data_mean = [0.0, 0.0];
      var data_scale = 1.0;
      var data_angle = 0.0;
      if ('transform' in positions) {
        data_mean = positions.transform.center;
        data_scale = positions.transform.scale;
        data_angle = positions.transform.angle;
        delete shifted_positions.transform
      }
      var scale_x = 400.0 / img.width;
      var scale_y = 400.0 / img.height;

      Object.keys(positions).forEach(function(key) {
        if (key=='transform') {
          return;
        }
        var curSection = positions[key];
        var shiftedSection = shifted_positions[key];
        for (var i=0; i<curSection.length; i++) {
          var cur_x = curSection[i][0];
          var cur_y = curSection[i][1];
          // get ready for drawing the face
          shiftedSection[i][0] = cur_x;
          shiftedSection[i][1] = cur_y;
        }
      });


      var scale_x = 250.0 / img.width;
      var scale_y = 250.0 / img.height;
      var x2 = (3*width/4-250/2);
      push();
      translate(x2, y1);
      translate(scale_x*data_mean[0], scale_y*data_mean[1]);
      scale(scale_x*data_scale, scale_y*data_scale);
      rotate(degrees(data_angle));
      strokeWeight(1/data_scale);
      mainFace.setProperties(params);
      mainFace.draw(shifted_positions);
      pop();

      var scale_x = 80.0 / img.width;
      var scale_y = 80.0 / img.height;
      for(var j=0; j<4; j++) {
        // var keys = Object.keys(trainData);
        var curKey = curNeighbors[j];
        var x2 = (3*width/4 - 200 + j*100);

        push();
        translate(x2, y2);

        if (curKey in trainValues) {
          var settings = trainValues[curKey]
          translate(scale_x*data_mean[0], scale_y*data_mean[1]);
          scale(scale_x*data_scale, scale_y*data_scale);
          rotate(degrees(data_angle));
          strokeWeight(1/data_scale);
          littleFace.setProperties(settings);
          littleFace.draw(shifted_positions);
        }
        else {
          noFill();
          stroke(100);
          rect(10, 10, 70, 70);
        }
        pop();
      }
    }

    textDisplay = "Neighbors: " + trainDataKeys[curTrainIndex];
  }

  else if (mode == 'TrainQuiz' || mode == 'ValidQuiz') {
    var curKey = trainDataKeys[curTrainIndex];
    var data = trainData[curKey];
    var valid_mode = false;
    if (mode == 'ValidQuiz') {
        valid_mode = true;
        curKey = validDataKeys[curValidIndex];
        data = validData[curKey];
    }

    // Displays the image at its actual size at point (0,0)
    var img = data.image
    var x1 = (width/2-200/2);
    var y1 = (height/3-300/2);
    image(img, x1, y1, 200, 200);
    if(valid_mode) {
      fill(0, 0, 200);
    }
    else if (curKey in trainValues) {
      fill(0, 200, 0);
    }
    else {
      fill(200, 0, 0);
    }
    ellipse(x1+200/2, y1+200+15, 10, 10);

    var y2 = (3*height/5-80/2);
    var y3 = (4*height/5-80/2);

/*
    for(var i=0; i<4; i++) {
      // var keys = Object.keys(trainData);
      var curKey = curNeighbors[i];
      var nearData = trainData[curKey];      

      // Displays the image at its actual size at point (0,0)
      var img = nearData.image
      var x2 = (width/4 - 200 + i*100);
      image(img, x2, y2, 80, 80);
    }
*/
    for(var i=0; i<1; i++) {
      // get array of face marker positions [x, y] format
      var positions = data.landmarks[i];
      var shifted_positions = JSON.parse(JSON.stringify(positions))

      var data_mean = [0.0, 0.0];
      var data_scale = 1.0;
      var data_angle = 0.0;
      if ('transform' in positions) {
        data_mean = positions.transform.center;
        data_scale = positions.transform.scale;
        data_angle = positions.transform.angle;
        delete shifted_positions.transform
      }
      var scale_x = 400.0 / img.width;
      var scale_y = 400.0 / img.height;

      Object.keys(positions).forEach(function(key) {
        if (key=='transform') {
          return;
        }
        var curSection = positions[key];
        var shiftedSection = shifted_positions[key];
        for (var i=0; i<curSection.length; i++) {
          var cur_x = curSection[i][0];
          var cur_y = curSection[i][1];
          // get ready for drawing the face
          shiftedSection[i][0] = cur_x;
          shiftedSection[i][1] = cur_y;
        }
      });


/*
      var scale_x = 250.0 / img.width;
      var scale_y = 250.0 / img.height;
      var x2 = (3*width/4-250/2);
      push();
      translate(x2, y1);
      translate(scale_x*data_mean[0], scale_y*data_mean[1]);
      scale(scale_x*data_scale, scale_y*data_scale);
      rotate(degrees(data_angle));
      strokeWeight(1/data_scale);
      mainFace.setProperties(params);
      mainFace.draw(shifted_positions);
      pop();
*/

      var scale_x = 80.0 / img.width;
      var scale_y = 80.0 / img.height;
      var otherKeys = Object.keys(trainValues);
      var index = otherKeys.indexOf(trainDataKeys[curTrainIndex]);
      if(index >= 0) {
        otherKeys.splice(index, 1);
      }
      var answerSlot = int(focusedRandom(0, 4));
      var answerKeys = Array(4);
      for(var j=0; j<4; j++) {
        if(j == answerSlot) {
          curKey = trainDataKeys[curTrainIndex];
        }
        else {
          var guess = int(focusedRandom(0, otherKeys.length));
          // if(otherKeys.length > j+2) {
          //   while(answerKeys.indexOf(guess) == -1) {
          //     guess = int(focusedRandom(0, otherKeys.length));
          //   }            
          // }
          curKey = otherKeys[guess];
        }
        answerKeys[j] = curKey;
        // print("Answer", j, " is ", curKey);
        var x2 = (width/2 - 200 + j*100);

        var settings = params;
        if (valid_mode && j == answerSlot) {
            var curEmbedding = data.embedding[0];
            results = getAverageSettingsFrom(curEmbedding);
            settings = results[0];
            var validTrainKeys = results[1];
        }
        else if (curKey in trainValues) {
            settings = trainValues[curKey];
        }
        push();
        translate(x2, y2);
        translate(scale_x*data_mean[0], scale_y*data_mean[1]);
        scale(scale_x*data_scale, scale_y*data_scale);
        rotate(degrees(data_angle));
        strokeWeight(1/data_scale);
        littleFace.setProperties(settings);
        littleFace.draw(shifted_positions);
        pop();
        if(quiz_done && guessed_answer == (j+1)) {          
          push();
          translate(x2, y2);
          noFill();
          strokeWeight(4);
          if(guessed_answer == (answerSlot+1)) {
            stroke(0, 100, 0);
          }
          else {
            stroke(100, 0, 0);
          }
          rect(-10, -10, 100, 100);
          pop();
        }
      }
      if(quiz_done) {
        for(var j=0; j<4; j++) {
          if (valid_mode && (answerSlot+1) == (j+1)) {
            for(var k=0; k<4; k++) {
              var curKey = validTrainKeys[k];
              var nearData = trainData[curKey];      
              // Displays the image at its actual size at point (0,0)
              var img = nearData.image
              var x2 = (width/2 - 200 + j*100 + (k%2)*40);
              var y4 = y3 + (int(k/2))*40;
              image(img, x2, y4, 40, 40);              
            }
          }
          else {
            var curKey = answerKeys[j];
            var nearData = trainData[curKey];      
            // Displays the image at its actual size at point (0,0)
            var img = nearData.image
            var x2 = (width/2 - 200 + j*100);
            image(img, x2, y3, 80, 80);            
          }
        }          
      }
    }

    if(valid_mode) {
      if(quiz_done) {
        textDisplay = "ValidQuiz: hit spacebar to continue";
      }
      else {
        textDisplay = "ValidQuiz: hit 1, 2, 3, or 4 to guess";        
      }
    }
    else {
      if(quiz_done) {
        textDisplay = "TrainQuiz: hit spacebar to continue";
      }
      else {
        textDisplay = "TrainQuiz: hit 1, 2, 3, or 4 to guess";        
      }
    }
  }


  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(textDisplay, width/2, height-12);
}

function keyTyped() {
  if(!haveStarted) {
    return;
  }
  var mode = faceSelector.value();
  if (key == 'q' && mode != 'Face') {
    print("face")
    faceSelector.value('Face');
  }
  else if (key == 'w' && mode != 'FaceMap') {
    print("facemap")
    faceSelector.value('FaceMap');
  }
  else if (key == 'e' && mode != 'Train') {
    faceSelector.value('Train');
  }
  else if (key == 'r' && mode != 'Neighbors') {
    faceSelector.value('Neighbors');
  }
  else if (key == 't' && mode != 'TrainQuiz') {
    faceSelector.value('TrainQuiz');
  }
  else if (key == 'y' && mode != 'ValidQuiz') {
    faceSelector.value('ValidQuiz');
  }

  if (key == ' ' && 
    (mode == 'TrainQuiz' || mode == 'ValidQuiz') && quiz_done) {
    quiz_done = false;
    if(mode == 'TrainQuiz') {
        curTrainIndex = (curTrainIndex + 1) % trainDataKeys.length;
    }
    else {
        curValidIndex = (curValidIndex + 1) % validDataKeys.length;
    }
    changeRandomSeed();    
  }
  else if ((mode == 'TrainQuiz' || mode == 'ValidQuiz') && quiz_done == false) {
    if(key >= '1' && key <= '4') {
      guessed_answer = key - '0';
      quiz_done = true;
    }
  }

  if (key == 's') {
    saveCurrentSettings();
  }
  else if (key == 'i') {
    interpolateCurrent();
  }
  else if (key == 'l') {
    loadCurrentSettings();
  }

  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}

function interpolateCurrent() {
  var curNeighborSettings = [];
  var trainValues = getCurTrainValues();

  for(var i=0; i<4; i++) {
    neighborKey = curNeighbors[i]
    if(neighborKey in trainValues) {
      curNeighborSettings.push(trainValues[neighborKey]);
    }
  }

  for(var i=0; i<NUM_SLIDERS; i++) {
    sliders[i].value(50);
  }

  if(curNeighborSettings.length > 0) {
    settings = curNeighborSettings[0];
    for(var i=0; i<settings.length; i++) {
      var sum = 0;
      for(j=0; j<curNeighborSettings.length; j++) {
        sum += curNeighborSettings[j][i];
      }
      var avg = int(sum / curNeighborSettings.length)
      sliders[i].value(avg);
    }
  }
}

function loadCurrentSettings() {
  var trainValues = getCurTrainValues();
  var curKey = trainDataKeys[curTrainIndex];
  for(var i=0; i<NUM_SLIDERS; i++) {
    sliders[i].value(50);
  }    
  if (curKey in trainValues) {
    var settings = trainValues[curKey]
    for(var i=0; i<settings.length; i++) {
      sliders[i].value(settings[i]);
    }
  }
}

function updateSlidersForTraining() {
  var trainValues = getCurTrainValues();
  var mode = faceSelector.value();
  var curKey = trainDataKeys[curTrainIndex];

  // first find the closest neighbors
  var nearest = allEmbeddingsTree.nearest(trainData[curKey].embedding[0], 5);
  curNeighbors = [];
  curNeighborSettings = [];
  for(var i=0; i<5; i++) {
    if(nearest[i][0][128] != curKey) {
      var neighborKey = nearest[i][0][128];
      curNeighbors.push(neighborKey);
      if(neighborKey in trainValues) {
        curNeighborSettings.push(trainValues[neighborKey]);
      }
    }
  }

  loadCurrentSettings();
  // if(mode == 'Neighbors') {
  //   interpolateCurrent();
  // }
  // else {
  //   loadCurrentSettings();
  // }
}

function getAverageSettingsFrom(e) {
  // first find the closest neighbors
  var trainValues = getCurTrainValues();
  var nearest = allEmbeddingsTree.nearest(e, 4);
  curNeighbors = [];
  curNeighborSettings = [];
  for(var i=0; i<4; i++) {
    var neighborKey = nearest[i][0][128];
    curNeighbors.push(neighborKey);
    if(neighborKey in trainValues) {
      curNeighborSettings.push(trainValues[neighborKey]);
    }
  }

  for(var i=0; i<4; i++) {
    neighborKey = curNeighbors[i]
    if(neighborKey in trainValues) {
      curNeighborSettings.push(trainValues[neighborKey]);
    }
  }

  var trainValueKeys = Object.keys(trainValues);
  var props = trainValues[trainValueKeys[0]];

  if(curNeighborSettings.length > 0) {
    settings = curNeighborSettings[0];
    for(var i=0; i<settings.length; i++) {
      var sum = 0;
      for(j=0; j<curNeighborSettings.length; j++) {
        sum += curNeighborSettings[j][i];
      }
      var avg = int(sum / curNeighborSettings.length)
      props[i] = avg;
    }
  }
  return [props, curNeighbors];
}

function keyPressed() {
  if(!haveStarted) {
    return;
  }
  if(keyCode == UP_ARROW) {
    var newIndex = (curSubmissionIndex + submissions.length - 1) % submissions.length;
    submissionSelector.value(submissions[newIndex]);
    updateSubmissions();
  }
  if(keyCode == DOWN_ARROW) {
    var newIndex = (curSubmissionIndex + 1) % submissions.length;
    submissionSelector.value(submissions[newIndex]);    
    updateSubmissions();
  }
  var mode = faceSelector.value();
  if (mode == 'FaceMap') {
    if (keyCode == LEFT_ARROW) {
      curFaceIndex = (curFaceIndex + faceData.length - 1) % faceData.length;
    } else if (keyCode === RIGHT_ARROW) {
      curFaceIndex = (curFaceIndex + 1) % faceData.length;
    }
  }
  else if (mode == 'Train' || mode == 'Neighbors') {
    if (keyCode == LEFT_ARROW) {
      curTrainIndex = (curTrainIndex + trainDataKeys.length - 1) % trainDataKeys.length;
      updateSlidersForTraining();
    } else if (keyCode == RIGHT_ARROW) {
      curTrainIndex = (curTrainIndex + 1) % trainDataKeys.length;
      updateSlidersForTraining();
    }
  }
}
