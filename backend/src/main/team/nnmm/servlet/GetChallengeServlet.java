package team.nnmm.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import team.nnmm.mysql.GetChallenge;
import team.nnmm.mysql.SQLConn;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class GetChallengeServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json;charset=utf-8");
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET,POST");

        ObjectMapper OM = new ObjectMapper();
        PrintWriter out = resp.getWriter();


        Connection conn = SQLConn.conn();
        ArrayList<Integer> res = GetChallenge.getArray(conn);
        SQLConn.disConn(conn);

        MessageBean jsonOut = new MessageBean("updated", res);

        out.print(OM.writeValueAsString(jsonOut));
    }

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        doGet(req, resp);
    }

    public GetChallengeServlet() {
    }
}
