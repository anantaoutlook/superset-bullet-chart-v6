import { CategoricalScheme } from '@superset-ui/core';
var schemes = [{
  id: '_pink',
  label: 'Pink',
  colors: ['rgb(255, 184, 218)', 'rgb(254, 164, 208)', 'rgb(254, 143, 197)', 'rgb(254, 123, 187)', 'rgb(254, 103, 176)', 'rgb(254, 83, 165)', 'rgb(254, 62, 155)', 'rgb(254, 42, 144)', 'rgb(254, 22, 134)', 'rgb(254, 1, 123)', 'rgb(233, 1, 113)', 'rgb(213, 1, 104)', 'rgb(193, 1, 94)', 'rgb(172, 1, 84)', 'rgb(152, 1, 74)', 'rgb(132, 1, 64)']
}, {
  id: '_red',
  label: 'Red',
  colors: ['rgb(235, 163, 163)', 'rgb(231, 146, 146)', 'rgb(228, 129, 129)', 'rgb(224, 112, 112)', 'rgb(221, 96, 96)', 'rgb(217, 79, 79)', 'rgb(213, 62, 62)', 'rgb(210, 45, 45)', 'rgb(193, 42, 42)', 'rgb(176, 38, 38)', 'rgb(159, 34, 34)', 'rgb(143, 31, 31)']
}, {
  id: '_green',
  label: 'Green',
  colors: ['rgb(119, 197, 126)', 'rgb(105, 191, 112)', 'rgb(91, 185, 99)', 'rgb(76, 179, 85)', 'rgb(70, 164, 79)', 'rgb(64, 150, 72)', 'rgb(58, 136, 65)', 'rgb(52, 122, 58)', 'rgb(46, 107, 51)', 'rgb(40, 93, 44)']
}, {
  id: '_blue',
  label: 'Blue',
  colors: ['rgb(182, 188, 237)', 'rgb(165, 173, 232)', 'rgb(149, 158, 228)', 'rgb(133, 143, 224)', 'rgb(116, 128, 220)', 'rgb(100, 113, 216)', 'rgb(84, 98, 212)', 'rgb(68, 83, 208)', 'rgb(51, 68, 204)', 'rgb(47, 62, 187)', 'rgb(43, 57, 171)', 'rgb(39, 52, 155)', 'rgb(35, 46, 139)']
}, {
  id: '_dark_yellow',
  label: 'Dark Yellow',
  colors: ['rgb(249, 240, 180)', 'rgb(247, 235, 158)', 'rgb(246, 231, 137)', 'rgb(244, 226, 115)', 'rgb(242, 222, 94)', 'rgb(240, 217, 73)', 'rgb(239, 213, 51)', 'rgb(237, 209, 30)', 'rgb(225, 197, 18)', 'rgb(204, 178, 16)', 'rgb(182, 159, 15)', 'rgb(161, 141, 13)']
}, {
  id: '_light_green',
  label: 'Light Green',
  colors: ['rgb(163, 255, 163)', 'rgb(143, 255, 143)', 'rgb(122, 255, 122)', 'rgb(102, 255, 102)', 'rgb(82, 255, 82)', 'rgb(61, 255, 61)', 'rgb(0, 255, 0)', 'rgb(0, 235, 0)', 'rgb(0, 214, 0)', 'rgb(0, 194, 0)', 'rgb(0, 173, 0)', 'rgb(0, 153, 0)', 'rgb(0, 133, 0)']
}, {
  id: '_light_grey',
  label: 'Grey',
  colors: ['rgb(219, 219, 219)', 'rgb(209, 209, 209)', 'rgb(199, 199, 199)', 'rgb(189, 189, 189)', 'rgb(179, 179, 179)', 'rgb(168, 168, 168)', 'rgb(158, 158, 158)', 'rgb(148, 148, 148)', 'rgb(138, 138, 138)', 'rgb(128, 128, 128)', 'rgb(117, 117, 117)', 'rgb(107, 107, 107)', 'rgb(97, 97, 97)', 'rgb(87, 87, 87)', 'rgb(77, 77, 77)', 'rgb(66, 66, 66)', 'rgb(56, 56, 56)', 'rgb(46, 46, 46)', 'rgb(36, 36, 36)', 'rgb(26, 26, 26)']
}, {
  id: '_purple',
  label: 'Purple',
  colors: ['rgb(247, 212, 234)', 'rgb(244, 195, 226)', 'rgb(241, 177, 217)', 'rgb(238, 160, 209)', 'rgb(234, 143, 201)', 'rgb(231, 126, 192)', 'rgb(228, 109, 184)', 'rgb(225, 91, 176)', 'rgb(222, 74, 167)', 'rgb(218, 57, 159)', 'rgb(215, 40, 151)', 'rgb(198, 37, 139)', 'rgb(181, 33, 127)', 'rgb(164, 30, 115)', 'rgb(146, 27, 102)', 'rgb(129, 24, 90)', 'rgb(112, 21, 78)', 'rgb(95, 17, 66)', 'rgb(78, 14, 54)']
}, {
  id: '_Cyan',
  label: 'Cyan',
  colors: ['rgb(212, 243, 247)', 'rgb(195, 238, 244)', 'rgb(177, 233, 241)', 'rgb(160, 229, 238)', 'rgb(143, 224, 234)', 'rgb(74, 205, 222)', 'rgb(40, 195, 215)', 'rgb(37, 179, 198)', 'rgb(33, 164, 181)', 'rgb(30, 148, 164)', 'rgb(27, 133, 146)', 'rgb(24, 117, 129)', 'rgb(21, 101, 112)', 'rgb(17, 86, 95)', 'rgb(14, 70, 78)']
}, {
  id: '_light_green_intense',
  label: 'Light Green Intense',
  colors: ['rgb(205, 220, 205)', 'rgb(191, 210, 191)', 'rgb(176, 200, 176)', 'rgb(162, 190, 162)', 'rgb(148, 180, 148)', 'rgb(134, 170, 134)', 'rgb(119, 160, 119)', 'rgb(105, 150, 105)', 'rgb(95, 136, 95)', 'rgb(85, 121, 85)', 'rgb(75, 107, 75)', 'rgb(65, 93, 65)', 'rgb(55, 78, 55)', 'rgb(45, 64, 45)', 'rgb(35, 50, 35)', 'rgb(25, 36, 25)', 'rgb(15, 21, 15)', 'rgb(5, 7, 5)']
}, {
  id: '_blue_intense',
  label: 'Blue Intense',
  colors: ['rgb(204, 215, 234)', 'rgb(190, 203, 228)', 'rgb(176, 191, 222)', 'rgb(161, 180, 216)', 'rgb(147, 168, 210)', 'rgb(132, 157, 204)', 'rgb(118, 145, 199)', 'rgb(103, 134, 193)', 'rgb(89, 122, 187)', 'rgb(74, 110, 181)', 'rgb(68, 102, 166)', 'rgb(62, 93, 152)', 'rgb(56, 84, 137)', 'rgb(51, 75, 123)', 'rgb(45, 66, 108)', 'rgb(39, 57, 94)', 'rgb(33, 49, 79)', 'rgb(27, 40, 65)', 'rgb(21, 31, 51)', 'rgb(15, 22, 36)', 'rgb(9, 13, 22)']
}, {
  id: '_sea_green_intense',
  label: 'Sea Green Intense',
  colors: ['rgb(225, 254, 252)', 'rgb(205, 254, 250)', 'rgb(186, 253, 248)', 'rgb(166, 253, 246)', 'rgb(146, 252, 244)', 'rgb(7, 248, 229)', 'rgb(6, 228, 211)', 'rgb(6, 208, 193)', 'rgb(5, 189, 174)', 'rgb(5, 169, 156)', 'rgb(4, 149, 138)', 'rgb(4, 129, 119)', 'rgb(3, 109, 101)', 'rgb(2, 89, 83)', 'rgb(2, 69, 64)', 'rgb(1, 50, 46)', 'rgb(1, 30, 28)', 'rgb(0, 10, 9)']
}].map(s => new CategoricalScheme(s));
export default schemes;