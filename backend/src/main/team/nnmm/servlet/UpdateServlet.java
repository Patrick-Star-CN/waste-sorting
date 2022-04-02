package team.nnmm.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import team.nnmm.mysql.SQLConn;
import team.nnmm.mysql.UpdateRank;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class UpdateServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        doPost(req, resp);
    }

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json;charset=utf-8");
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET,POST");

        ObjectMapper OM = new ObjectMapper();
        ScoreBean jsonIn = OM.readValue(JSONReader.receivePost(req), ScoreBean.class);
        PrintWriter out = resp.getWriter();

        String username = jsonIn.getUsername();
        int score = Integer.parseInt(jsonIn.getScore());

        Connection conn = SQLConn.conn();
        String res = UpdateRank.update(conn, username, score);
        SQLConn.disConn(conn);

        MessageBean jsonOut = new MessageBean(res, null);
        out.print(OM.writeValueAsString(jsonOut));
    }

    public UpdateServlet() {

    }
}
