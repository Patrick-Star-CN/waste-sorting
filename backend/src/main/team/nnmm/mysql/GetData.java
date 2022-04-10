package team.nnmm.mysql;

import team.nnmm.servlet.ScoreBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class GetData {
    public static ArrayList<ScoreBean> getData(Connection conn) {
        PreparedStatement psql = null;
        ResultSet re = null;
        ArrayList<ScoreBean> result = new ArrayList<>();
        try {
            String sql = "select * from ranking order by score";
            psql = conn.prepareStatement(sql);
            re = psql.executeQuery();
            if(re.isBeforeFirst()) {
                int n = 0;
                while(re.next() && n ++ < 10) {
                    ScoreBean result_ = new ScoreBean(re.getString("username"), Integer.toString(re.getInt("score")));
                    result.add(result_);
                }
            } else {
                result = null;
            }
            return result;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private GetData() {
    }
}
