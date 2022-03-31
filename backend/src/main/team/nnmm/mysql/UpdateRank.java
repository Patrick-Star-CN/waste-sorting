package team.nnmm.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * @author Patrick_Star
 * @version 1.0
 */
public class UpdateRank {
    public static String update(Connection conn, String username, int score) {
        PreparedStatement psql = null;
        ResultSet re = null;
        PreparedStatement psqlUpdate = null;
        try {
            String sql = "select * from ranking where username = ?";
            String sqlUpdate = null;
            psql = conn.prepareStatement(sql);
            psql.setString(1, username);
            re = psql.executeQuery();
            if(re.isBeforeFirst()) {
                re.next();
                int score_ = re.getInt("score");
                if(score_ < score) {
                    sqlUpdate = "update ranking set score = ? where username = ?";
                    psqlUpdate = conn.prepareStatement(sqlUpdate);
                    psqlUpdate.setInt(1, score);
                    psqlUpdate.setString(2, username);
                    psqlUpdate.executeUpdate();
                }
            } else {
                sqlUpdate = "insert into ranking (username, score)" + "values(?, ?)";
                psqlUpdate = conn.prepareStatement(sqlUpdate);
                psqlUpdate.setString(1, username);
                psqlUpdate.setInt(2, score);
                psqlUpdate.executeUpdate();
            }
            return "success";
        } catch (SQLException e) {
            e.printStackTrace();
            return "error";
        } finally {
            if(psqlUpdate != null) {
                try {
                    psqlUpdate.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if(re != null) {
                try {
                    re.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if(psql != null) {
                try {
                    psql.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private UpdateRank() {

    }
}
