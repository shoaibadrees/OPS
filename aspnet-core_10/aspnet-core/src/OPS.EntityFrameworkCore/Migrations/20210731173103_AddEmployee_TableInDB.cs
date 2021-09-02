using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class AddEmployee_TableInDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "ItemUnitPrice",
                table: "OrdersDetails",
                type: "numeric(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "numberic(18,2)");

            migrationBuilder.CreateTable(
                name: "AddEmployee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Age = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddEmployee", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddEmployee");

            migrationBuilder.AlterColumn<int>(
                name: "ItemUnitPrice",
                table: "OrdersDetails",
                type: "numberic(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)");
        }
    }
}
