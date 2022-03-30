/*
 Navicat Premium Data Transfer

 Source Server         : SQL
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : waste-sort

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 26/03/2022 14:28:19
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

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- Table structure for wastedata
-- ----------------------------
DROP TABLE IF EXISTS `wastedata`;
CREATE TABLE `wastedata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `width` int(0) NOT NULL,
  `height` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wastedata
-- ----------------------------
INSERT INTO `wastedata` VALUES (1, '较完整的玻璃制品', 'recyclable', 2, 1);
INSERT INTO `wastedata` VALUES (2, '小鸭子玩具', 'recyclable', 1, 1);
INSERT INTO `wastedata` VALUES (3, '旧衣服', 'recyclable', 2, 2);
INSERT INTO `wastedata` VALUES (4, '毛绒玩具', 'recyclable', 2, 2);
INSERT INTO `wastedata` VALUES (5, '旧书', 'recyclable', 2, 2);
INSERT INTO `wastedata` VALUES (6, '易拉罐', 'recyclable', 1, 1);
INSERT INTO `wastedata` VALUES (7, '皮鞋', 'recyclable', 1, 3);
INSERT INTO `wastedata` VALUES (8, '大骨头', 'food', 3, 1);
INSERT INTO `wastedata` VALUES (9, '鱼骨', 'food', 1, 2);
INSERT INTO `wastedata` VALUES (10, '烟蒂', 'other', 1, 1);
INSERT INTO `wastedata` VALUES (11, '碎碗碟', 'other', 1, 2);
INSERT INTO `wastedata` VALUES (12, '电池', 'harmful', 1, 1);
INSERT INTO `wastedata` VALUES (13, '灯泡', 'harmful', 1, 2);
INSERT INTO `wastedata` VALUES (14, '过期药物', 'harmful', 1, 1);
INSERT INTO `wastedata` VALUES (15, '牛奶纸盒', 'recyclable', 2, 2);
INSERT INTO `wastedata` VALUES (16, '尿片', 'other', 1, 2);
INSERT INTO `wastedata` VALUES (17, '菜叶', 'food', 2, 1);
INSERT INTO `wastedata` VALUES (18, '脸盆', 'recyclable', 2, 1);
INSERT INTO `wastedata` VALUES (19, '废灯管', 'harmful', 1, 3);
INSERT INTO `wastedata` VALUES (20, '污损塑料袋', 'other', 2, 2);

SET FOREIGN_KEY_CHECKS = 1;
