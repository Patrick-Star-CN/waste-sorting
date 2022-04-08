/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : waste-sort

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 08/04/2022 20:45:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ranking
-- ----------------------------
DROP TABLE IF EXISTS `ranking`;
CREATE TABLE `ranking`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `score` int(0) NOT NULL,
  PRIMARY KEY (`score`, `username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ranking
-- ----------------------------

-- ----------------------------
-- Table structure for wastedata
-- ----------------------------
DROP TABLE IF EXISTS `wastedata`;
CREATE TABLE `wastedata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` int(0) NOT NULL,
  `width` int(0) NOT NULL,
  `height` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wastedata
-- ----------------------------
INSERT INTO `wastedata` VALUES (1, '较完整的玻璃制品', 1, 2, 1);
INSERT INTO `wastedata` VALUES (2, '小鸭子玩具', 1, 1, 1);
INSERT INTO `wastedata` VALUES (3, '旧衣服', 1, 2, 2);
INSERT INTO `wastedata` VALUES (4, '毛绒玩具', 1, 2, 2);
INSERT INTO `wastedata` VALUES (5, '旧书', 1, 2, 2);
INSERT INTO `wastedata` VALUES (6, '易拉罐', 1, 1, 1);
INSERT INTO `wastedata` VALUES (7, '皮鞋', 1, 1, 3);
INSERT INTO `wastedata` VALUES (8, '大骨头', 2, 3, 1);
INSERT INTO `wastedata` VALUES (9, '鱼骨', 2, 1, 2);
INSERT INTO `wastedata` VALUES (10, '烟蒂', 3, 1, 1);
INSERT INTO `wastedata` VALUES (11, '碎碗碟', 3, 1, 2);
INSERT INTO `wastedata` VALUES (12, '电池', 4, 1, 1);
INSERT INTO `wastedata` VALUES (13, '灯泡', 4, 1, 2);
INSERT INTO `wastedata` VALUES (14, '过期药物', 4, 1, 1);
INSERT INTO `wastedata` VALUES (15, '牛奶纸盒', 1, 2, 2);
INSERT INTO `wastedata` VALUES (16, '尿片', 3, 1, 2);
INSERT INTO `wastedata` VALUES (17, '菜叶', 2, 2, 1);
INSERT INTO `wastedata` VALUES (18, '脸盆', 1, 2, 1);
INSERT INTO `wastedata` VALUES (19, '废灯管', 4, 1, 3);
INSERT INTO `wastedata` VALUES (20, '污损塑料袋', 3, 2, 2);

SET FOREIGN_KEY_CHECKS = 1;
