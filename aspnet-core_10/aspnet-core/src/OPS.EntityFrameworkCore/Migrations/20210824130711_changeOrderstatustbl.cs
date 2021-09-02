using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class changeOrderstatustbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "isActive",
                table: "OrdersStatus",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Abb",
                table: "OrdersStatus",
                type: "char(1)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isVisible",
                table: "OrdersStatus",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Abb",
                table: "OrdersStatus");

            migrationBuilder.DropColumn(
                name: "isVisible",
                table: "OrdersStatus");

            migrationBuilder.AlterColumn<bool>(
                name: "isActive",
                table: "OrdersStatus",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
