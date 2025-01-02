type TypingExercise = {
  lesson: number;
  keys: string[];
  description: string;
  exercise: string;
};

type TypingExercises = {
  [category: string]: TypingExercise[]; // Allow any string as a category name
};

// Define the typingExercises object
export const typingExercises: TypingExercises = {
  Home: [
    {
      lesson: 1,
      keys: ["f", "j"],
      description: "Practice the home row keys: f and j.",
      exercise:
        "fjfj jfjf ffjj jjff fjjf fffj jfjf fjjf fjfj jfjf ffjj jjff fjjf fffj jfjf fjjf ffjf jfjj fjfj jjfj",
    },
    {
      lesson: 2,
      keys: ["d", "k"],
      description: "Practice the home row keys: d and k.",
      exercise:
        "dkdk kdkd ddkk kkdd dkkd ddkk kdkd dkdk ddkk kkdd dkkd dkdk ddkk kdkd dkdk kkdd dkdk ddkk kdkd kddk",
    },
    {
      lesson: 3,
      keys: ["s", "l"],
      description: "Practice the home row keys: s and l.",
      exercise:
        "slsl lsls ssll llss slsl sssl lssl slll slss llss sssl llsl slsl lsss lssl ssll lsss llss sssl lsll",
    },
    {
      lesson: 4,
      keys: ["a", ";"],
      description: "Practice the home row keys: a and ;.",
      exercise:
        "a;a; ;a;a aa;; ;;aa a;;a ;a;a aa;a ;;aa ;;aa a;a; aa;; ;aa; aa;; ;a;a ;aa; ;;aa a;;a ;a;a aa;a",
    },
    {
      lesson: 5,
      keys: ["a", "s", "d", "f"],
      description: "Practice all left-hand home row keys.",
      exercise:
        "asdf fsda sdas fasd asdf fsad dsaf afsd dasf asfd fsda afds asdf fsda sdas fasd dasf afds afsd dsaf",
    },
    {
      lesson: 6,
      keys: ["j", "k", "l", ";"],
      description: "Practice all right-hand home row keys.",
      exercise:
        "jkl; ;lkj l;jk kj;l jkl; ;lkj l;jk j;kl k;lj ;kjl lj;k lk;j jkl; kj;l lj;k jkl; lj;k kj;l l;jk ;klj",
    },
    {
      lesson: 7,
      keys: ["g", "h"],
      description: "Practice the central keys: g and h.",
      exercise:
        "ghgh hghg gghh hhgg ghhg hggg hhgh ghhg gghh hhgg hghg ghhg gghh hhgg ghhg gghh hhgg hghg ghhg hghh",
    },
    {
      lesson: 8,
      keys: ["a", "s", "d", "f", "g"],
      description: "Combine left-hand home row with g.",
      exercise:
        "asdf gfas sdga agsd fgas gdas agdf gads fasg dasg gsfa agsd fgsa gfas sdga agsf afgs gsda fads dasg",
    },
    {
      lesson: 9,
      keys: ["j", "k", "l", ";", "h"],
      description: "Combine right-hand home row with h.",
      exercise:
        "jklh hkj; ljhk ;hlj jkhl hljk khlj l;hk hjkl jhkl khlj hljk ljhk hljk jklh kjhl ljhk ;hlj jklh jhlk",
    },
    {
      lesson: 10,
      keys: ["f", "d", "s", "a", "j", "k", "l", ";", "g", "h"],
      description: "Practice the entire home row.",
      exercise:
        "asdf jklh fgdh sajl hfdk sahj afgj sklj ahdl fkjs ahfj dksh fsal jgdh ahfj ksla dhfj gkhl sajd hfsl",
    },
  ],
  Top: [
    {
      lesson: 11,
      keys: ["r", "u"],
      description: "Practice the top row keys: r and u.",
      exercise:
        "ruru urur rrur urrr ruru urrr rurur urur rrur urru rurur urur rrur urrr ruru urur rrur urru urur urrr",
    },
    {
      lesson: 12,
      keys: ["e", "i"],
      description: "Practice the top row keys: e and i.",
      exercise:
        "eiei ieie eeie ieei eiei iiee ieei eiei eeie iiee ieei eiei iiee eeie ieei iiee eiei ieei iiee ieie",
    },
    {
      lesson: 13,
      keys: ["w", "o"],
      description: "Practice the top row keys: w and o.",
      exercise:
        "wowo owow woww oowo wwwo owwo woww wwoo owwo wwwo owwo woww wowo owow wwoo owwo wwwo wwoo oowo wwoo",
    },
    {
      lesson: 14,
      keys: ["q", "p"],
      description: "Practice the top row keys: q and p.",
      exercise:
        "qpqp pqpq qqpp ppqq qpqq pqqq qqpp ppqp qppq pqqp qqpq ppqq qpqq qqpp pqqp ppqp qpqp qqpp pqpp pqpq",
    },
    {
      lesson: 15,
      keys: ["q", "w", "e", "r"],
      description: "Practice all left-hand top row keys.",
      exercise:
        "qwer erqw rqwe wreq qwer wreq rwqe qwre eqwr weqr erqw rqwe qwre rwqe erqw wreq eqrw qwer rqwe weqr",
    },
    {
      lesson: 16,
      keys: ["u", "i", "o", "p"],
      description: "Practice all right-hand top row keys.",
      exercise:
        "uiop opiu poiu iopu uipo ioup puio oupi iupo opui poiu ouip uipo piuo opiu uipo oupi poiu iupo uiop",
    },
    {
      lesson: 17,
      keys: ["t", "y"],
      description: "Practice the central top row keys: t and y.",
      exercise:
        "tyty ytyt ttyy yytt tyty ytyy ttty yyty ttyy ytty tyyt ytty ttyt tyyy ytyt tyty ytyt tyyt ytty tyyy",
    },
    {
      lesson: 18,
      keys: ["q", "w", "e", "r", "t"],
      description: "Combine left-hand top row with t.",
      exercise:
        "qwer trwe wrqt trew rtqe weqr trwe rtqw tqwr rewq wter qwer twqr rewq tqwe rtqw weqr trwe qtrw tqwe",
    },
    {
      lesson: 19,
      keys: ["u", "i", "o", "p", "y"],
      description: "Combine right-hand top row with y.",
      exercise:
        "uiyo ypou upiy ioyp ypui opyu poiy ypoi iupy yoip upyi opiy ypou uiyp upoi ioyp poiu upiy ypou upoi",
    },
    {
      lesson: 20,
      keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      description: "Practice the entire top row.",
      exercise:
        "qwerty uiop yqti weop ruio pqyu wetr uopy tyui reqw opyu qwer tyui weop pqyu qity uiop wetr ruio tyqw",
    },
  ],
  "Revise 1": [
    {
      lesson: 21,
      keys: [
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
      ],
      description: "Home row + top row 'r', 'u', 'e', 'i'",
      exercise:
        "farm safe drill urge line hike rake fire grab herd rule sail earn read hire real fine gear user heal fair rare ripe",
    },
    {
      lesson: 22,
      keys: [
        "w",
        "o",
        "q",
        "p",
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
      ],
      description: "Combine home row with top row 'w', 'o', 'q', 'p'",
      exercise:
        "word pass queen fold grow hope quit wave roof pave wood pour weak proud sword power proof ward quest guide pool,",
    },
    {
      lesson: 23,
      keys: [
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
      ],
      description: "Combine home row and top row",
      exercise:
        "quick brown fox jumps over lazy dog quiet brave fox royal prize funky judge rows quiet tense spray ocean",
    },
    {
      lesson: 24,
      keys: [
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
      ],
      description: "Master home and top rows with mixed words",
      exercise:
        "type your dreams and reach high goals shine light, free task fair open world spark wild pure inspire care learn scope quite phase,",
    },
  ],

  Bottom: [
    {
      lesson: 25,
      keys: ["v", "m"],
      description: "Practice the keys: v and m.",
      exercise:
        "vmmv mvvm vmvm mmvm vvmm vmvm mvvm vvmm vmvm mvvm mmvm vvmm mvvm vmvm mmvm mvvm vvmm vmvm mmvm mvvm",
    },
    {
      lesson: 26,
      keys: ["c", ","],
      description: "Practice the keys: c and ,.",
      exercise:
        "c,,c ,c,c cc,, c,cc ,c,c cc,, ,cc, c,,c cc,, ,c,c cc,, ,cc, c,,c ,cc, cc,, ,c,c c,,c ,cc, cc,, ,c,c",
    },
    {
      lesson: 27,
      keys: ["x", "."],
      description: "Practice the keys: x and .",
      exercise:
        "x..x .x.x xx.. x.xx .x.x xx.. .xx. x..x xx.. .x.x x..x xx.. .xx. x..x xx.. .x.x x..x xx.. .xx. x.xx",
    },
    {
      lesson: 28,
      keys: ["z", "/"],
      description: "Practice the keys: z and /.",
      exercise:
        "z//z /z/z zz// z//z /z/z zz// /zz/ z//z zz// /z/z z//z zz// /zz/ z//z zz// /z/z z//z zz// /zz/ z/z/",
    },
    {
      lesson: 29,
      keys: ["z", "x", "c", "v"],
      description: "Practice the keys: z, x, c, and v.",
      exercise:
        "zxvc xcvz vzxc cvxz xcvz vzxc zxvc cvxz xcvz vzxc zxvc cvxz xcvz vzxc zxvc xcvz vzxc zxvc cvxz zxvc",
    },
    {
      lesson: 30,
      keys: ["m", ",", ".", "/"],
      description: "Practice the keys: m, ,, ., and /.",
      exercise:
        "m,./ ,m./ m/., .,m/ ,m./ m/., .,m/ m,./ ,m./ m/., .,m/ m,./ ,m./ m/., .,m/ m,./ ,m./ m/., .,m/ m,./",
    },
    {
      lesson: 31,
      keys: ["b", "n"],
      description: "Practice the keys: b and n.",
      exercise:
        "bnbn nbbn bnbn nbnb bnnn nbnb bnbn nbnn bnbn nbnb bnnn nbnb bnbn nbnn bnbn nbnb bnnn nbnb bnbn nbnb",
    },
    {
      lesson: 32,
      keys: ["z", "x", "c", "v", "b"],
      description: "Practice the keys: z, x, c, v, and b.",
      exercise:
        "zxcb cbzx xcvb bczx zxcb cbzx xcvb bczx zxcb cbzx xcvb bczx zxcb cbzx xcvb bczx zxcb cbzx xcvb bczx",
    },
    {
      lesson: 33,
      keys: ["m", ",", ".", "/", "n"],
      description: "Practice the keys: m, ,, ., /, and n.",
      exercise:
        "m,n. n/m, .n/m ,n.m m,n. n/m, .n/m ,n.m m,n. n/m, .n/m ,n.m m,n. n/m, .n/m ,n.m m,n. n/m, .n/m ,n.m",
    },
    {
      lesson: 34,
      keys: ["Bottom"],
      description: "Practice the bottom row keys.",
      exercise:
        "vm,c zx.v zm,n c.,v m/.x bn,z xvm, c.zx vm,n xbm, .vmc zm,. c,xv n.zm mcz. x,vn z,bm x.vm bczn vm,x",
    },
  ],
  "Revise 2": [
    {
      lesson: 35,
      keys: [
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
        "v",
        "m",
      ],
      description: "Practice combining home + top + new keys 'v' and 'm'.",
      exercise:
        "fire safe farm nerve maze hike vine view vibe magic math race serve vine fire safe farm maze magic vibe nerve",
    },
    {
      lesson: 36,
      keys: [
        "b",
        "n",
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
        "v",
        "m",
      ],
      description: "Combine learned keys with new additions 'b' and 'n'.",
      exercise:
        "ban net banner fin serve bend farm hike nerve vibe fire maze fix knife banner net fin serve bend hike nerve vibe",
    },
    {
      lesson: 37,
      keys: [
        "b",
        "n",
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
        "v",
        "m",
      ],
      description: "Practice all learned keys, including 'b' and 'n'.",
      exercise:
        "bend nerve frame vase fix banner fin hike safe magic fire vibe map bend nerve frame fix banner fin safe vibe magic",
    },
    {
      lesson: 38,
      keys: [
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
        "v",
        "m",
        "b",
        "n",
      ],
      description: "Practice combining home + top + bottom row keys.",
      exercise:
        "banner drive knife serve farm safe hike magic vibe bend nerve fix plan mark frame magic knife banner drive serve hike",
    },
    {
      lesson: 39,
      keys: [
        "a",
        "s",
        "d",
        "f",
        "j",
        "k",
        "l",
        ";",
        "g",
        "h",
        "r",
        "u",
        "e",
        "i",
        "v",
        "m",
        "b",
        "n",
      ],
      description: "Refine your skills with all keys learned so far.",
      exercise:
        "bend nerve safe magic frame mark serve vine fire hike map view fix vibe safe magic frame map view bend vibe fire",
    },
  ],
  Numbers: [
    {
      lesson: 40,
      keys: ["1", "2", "3", "4"],
      description: "Practice typing numbers: 1, 2, 3, and 4.",
      exercise: "1234 3412 2143 4321 1243 1342 4213 2314 1432 3214",
    },
    {
      lesson: 41,
      keys: ["7", "8", "9", "0"],
      description: "Practice typing numbers: 7, 8, 9, and 0.",
      exercise: "7890 9087 8790 0978 7809 8907 9780 7089 8097 9078",
    },
    {
      lesson: 42,
      keys: ["1", "2", "3", "4", "7", "8", "9", "0"],
      description: "Combine numbers from lessons 40 and 41.",
      exercise: "1278 3410 8972 2147 7098 4321 1289 9043 7812 2309",
    },
    {
      lesson: 43,
      keys: ["1", "2", "3", "4", "7", "8", "9", "0", "5", "6"],
      description: "Practice all number keys.",
      exercise:
        "123456 789012 567890 345678 901234 678905 234567 890123 456789 012345",
    },
  ],
  Symbols: [
    {
      lesson: 44,
      keys: ["!", "@", "#", "$"],
      description: "Practice typing special characters: !, @, #, and $.",
      exercise: "!@#$ @!#$ #$!@ $@!# @#$$ !!@@ ##$$ @#$! !#!$ #@$!",
    },
    {
      lesson: 45,
      keys: ["&", "*", "(", ")"],
      description: "Practice typing special characters: &, *, (, and ).",
      exercise: "&*() *&) (&*) ()*& *&() )&(* &()& *(*) (&&*) )()&",
    },
    {
      lesson: 46,
      keys: ["!", "@", "#", "$", "&", "*", "(", ")"],
      description: "Combine special characters from lessons 44 and 45.",
      exercise: "!@#$ &*() @!&* #$() &(!# )$*& *&@! @#$!) ()!&* #@!$&",
    },
    {
      lesson: 47,
      keys: ["^", "&", "_", "-"],
      description: "Practice typing special characters: ^, &, _, and -.",
      exercise: "^&_ -_^ &_^ ^_-& &^-_ --^^ _&&^ ^--_ &_^- ^_^&",
    },
    {
      lesson: 48,
      keys: ["~", "`", "+", "="],
      description: "Practice typing special characters: ~, `, +, and =.",
      exercise: "~`+= `~+= +=~` ~~++ ==~~ ~+`= `=~~ ++== ~`++ `+=~",
    },
    {
      lesson: 49,
      keys: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
      description: "Practice Shift + number keys for special characters.",
      exercise: "!@#$%^ &*()_+ @$#%^! _+&*() ^%$#! _)(*& $%^&* @#$_+",
    },
    {
      lesson: 50,
      keys: ["{", "[", "}", "]"],
      description: "Practice typing brackets: {, [, }, and ].",
      exercise: "{[]} [{}] ]{[} [}{] {[}] ]}[{ {{[[ }}]] [{{}]}",
    },
    {
      lesson: 51,
      keys: ["|", "\\", ":", ";"],
      description: "Practice typing pipe, backslash, colon, and semicolon.",
      exercise: "|:\\ ;|: \\:; ;|\\ ||:: \\;; |:| \\:| ;\\||",
    },
    {
      lesson: 52,
      keys: ["<", ",", ">", "."],
      description: "Practice typing angle brackets, comma, period.",
      exercise: "<>,. >,<. ,.<, .<>, <><. ,>>. <,<< >.<>",
    },
    {
      lesson: 53,
      keys: ['"', "'", "?", "/"],
      description: "Practice typing double, single quotes, ? mark and /",
      exercise: "\"'?/' '\"?/ \"?'/' /?'\" '?/\"' '\"'/' \"?/'\"",
    },
    {
      lesson: 54,
      keys: ["{", "[", "}", "]", "|", "\\", ":", ";"],
      description: "Combine keys from lessons 50 and 51.",
      exercise: "{|[ \\]} :;} |:[{ ]}|; {[:]} ||:[| {]}|;",
    },
    {
      lesson: 55,
      keys: ["<", ",", ">", ".", '"', "'", "?", "/"],
      description: "Combine keys from lessons 52 and 53.",
      exercise: "<\"? ,'> <.? ?./' \"?.< /<>, ,>?/ <\".'>",
    },
    {
      lesson: 56,
      keys: [
        "{",
        "[",
        "}",
        "]",
        "|",
        "\\",
        ":",
        ";",
        "<",
        ",",
        ">",
        ".",
        '"',
        "'",
        "?",
        "/",
      ],
      description: "Master symbols by combining lessons 54 and 55.",
      exercise: '{<[ "?:,]> [\\:"\'>< ]{|}\'"< >\\?/\'{< ;\\:"|<',
    },
  ],
};
